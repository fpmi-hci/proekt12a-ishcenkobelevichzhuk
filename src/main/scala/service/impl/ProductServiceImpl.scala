package service.impl

import cats.Monad
import cats.data.{Chain, EitherT, NonEmptyList}
import cats.syntax.all._
import domain.product.ProductStatus
import dto.attachment._
import dto.criteria.CriteriaDto
import dto.product._
import repository.{ProductRepository, SupplierRepository}
import service.ProductService
import service.error.general.{ErrorsOr, GeneralError}
import service.error.product.ProductError.ProductNotFound
import service.error.supplier.SupplierError.SupplierNotFound
import service.error.attachment.AttachmentError.AttachmentNotFound
import util.ModelMapper._

import java.util.UUID

class ProductServiceImpl[F[_]: Monad](
  productRep:         ProductRepository[F],
  supplierRepository: SupplierRepository[F]
) extends ProductService[F] {
  override def addProduct(productDto: CreateProductDto): F[ErrorsOr[UUID]] = {
    val res = for {
      product <- EitherT.fromEither(validateCreateProductDto(productDto).toEither.leftMap(_.toChain))
      _ <- EitherT.fromOptionF(
        supplierRepository.getById(product.supplierId),
        Chain[GeneralError](SupplierNotFound(product.supplierId.value))
      )
      id <- EitherT.liftF(productRep.addProduct(product)).leftMap((_: Nothing) => Chain.empty[GeneralError])
    } yield id

    res.value
  }

  override def updateProduct(
    productDto: UpdateProductDto
  ): F[ErrorsOr[UpdateProductDto]] = {
    val res = for {
      domain <- EitherT.fromEither(validateUpdateProductDto(productDto).toEither.leftMap(_.toChain))
      _ <- EitherT.fromOptionF(
        supplierRepository.getById(domain.supplierId),
        Chain[GeneralError](SupplierNotFound(domain.supplierId.value))
      )
      count <- EitherT.liftF(productRep.updateProduct(domain)).leftMap((_: Nothing) => Chain.empty[GeneralError])
      _     <- EitherT.cond(count > 0, count, Chain[GeneralError](ProductNotFound(domain.id.value)))
    } yield updateProductDomainToDto(domain)

    res.value
  }

  override def deleteProduct(id: UUID): F[ErrorsOr[Int]] = {
    val res = for {
      count  <- EitherT.liftF(productRep.deleteProduct(id)).leftMap((_: Nothing) => Chain.empty[GeneralError])
      result <- EitherT.cond(count > 0, count, Chain[GeneralError](ProductNotFound(id.toString)))
    } yield result

    res.value
  }

  override def readProducts(): F[List[ReadProductDto]] = {
    for {
      products <- productRep.viewProducts(NonEmptyList.of(ProductStatus.Available, ProductStatus.NotAvailable))
    } yield products.map(readProductDomainToDto)

  }

  override def attach(
    attachmentDto: CreateAttachmentDto
  ): F[ErrorsOr[UUID]] = {
    val res = for {
      attachment <- EitherT.fromEither(validateAttachmentDto(attachmentDto).toEither).leftMap(_.toChain)
      products <- EitherT
        .liftF(productRep.getByIds(NonEmptyList.of(attachment.productId)))
        .leftMap((_: Nothing) => Chain.empty[GeneralError])
      _ <- EitherT.cond(
        products.nonEmpty,
        products,
        Chain[GeneralError](ProductNotFound(attachment.productId.value))
      )
      id <- EitherT.liftF(productRep.attach(attachment)).leftMap((_: Nothing) => Chain.empty[GeneralError])
    } yield id

    res.value
  }

  override def searchByCriteria(
    criteriaDto: CriteriaDto
  ): F[ErrorsOr[List[ReadProductDto]]] = {
    val res = for {
      criteria <- EitherT.fromEither(validateCriteriaDto(criteriaDto).toEither.leftMap(_.toChain))
      products <- EitherT
        .liftF(productRep.searchByCriteria(criteria))
        .leftMap((_: Nothing) => Chain.empty[GeneralError])
    } yield products.map(readProductDomainToDto)

    res.value
  }

  override def removeAttachment(id: UUID): F[ErrorsOr[Int]] = {
    val res = for {
      count  <- EitherT.liftF(productRep.removeAttachment(id)).leftMap((_: Nothing) => Chain.empty[GeneralError])
      result <- EitherT.cond(count > 0, count, Chain[GeneralError](AttachmentNotFound(id.toString)))
    } yield result

    res.value
  }
}
