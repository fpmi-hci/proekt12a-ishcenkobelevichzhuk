package controller

import cats.effect.kernel.Concurrent
import cats.implicits._
import domain.user.{ReadAuthorizedUser, Role}
import dto.subscription.{CategorySubscriptionDto, SupplierSubscriptionDto}
import io.circe.generic.auto._
import org.http4s.AuthedRoutes
import org.http4s.circe.CirceEntityCodec.{circeEntityDecoder, circeEntityEncoder}
import org.http4s.dsl.Http4sDsl
import service.SubscriptionService
import service.error.user.UserError.InvalidUserRole
import util.ResponseHandlingUtil.marshalResponse

object SubscriptionController {
  def authedRoutes[F[_]: Concurrent](
    subscriptionService: SubscriptionService[F]
  )(
    implicit dsl: Http4sDsl[F]
  ): AuthedRoutes[ReadAuthorizedUser, F] = {
    import dsl._

    def subscribeSupplier(): AuthedRoutes[ReadAuthorizedUser, F] = AuthedRoutes.of[ReadAuthorizedUser, F] {
      case req @ POST -> Root / "api" / "subscription" / "supplier" as user if user.role == Role.Client =>
        val res = for {
          supplier <- req.req.as[SupplierSubscriptionDto]
          result   <- subscriptionService.subscribeSupplier(user, supplier)
        } yield result

        marshalResponse(res)

      case POST -> Root / "api" / "subscription" / "supplier" as user =>
        Forbidden(InvalidUserRole(user.role, List(Role.Client)).message)
    }

    def subscribeCategory(): AuthedRoutes[ReadAuthorizedUser, F] = AuthedRoutes.of[ReadAuthorizedUser, F] {
      case req @ POST -> Root / "api" / "subscription" / "category" as user if user.role == Role.Client =>
        val res = for {
          category <- req.req.as[CategorySubscriptionDto]
          result   <- subscriptionService.subscribeCategory(user, category)
        } yield result

        marshalResponse(res)

      case req @ POST -> Root / "api" / "subscription" / "category" as user =>
        Forbidden(InvalidUserRole(user.role, List(Role.Client)).message)
    }

    def removeSupplierSubscription(): AuthedRoutes[ReadAuthorizedUser, F] = AuthedRoutes.of[ReadAuthorizedUser, F] {
      case req @ DELETE -> Root / "api" / "subscription" / "supplier" as user if user.role == Role.Client =>
        val res = for {
          supplier <- req.req.as[SupplierSubscriptionDto]
          result   <- subscriptionService.removeSupplierSubscription(user, supplier)
        } yield result

        marshalResponse(res)

      case req @ DELETE -> Root / "api" / "subscription" / "supplier" as user =>
        Forbidden(InvalidUserRole(user.role, List(Role.Client)).message)
    }

    def removeCategorySubscription(): AuthedRoutes[ReadAuthorizedUser, F] = AuthedRoutes.of[ReadAuthorizedUser, F] {
      case req @ DELETE -> Root / "api" / "subscription" / "category" as user if user.role == Role.Client =>
        val res = for {
          category <- req.req.as[CategorySubscriptionDto]
          result   <- subscriptionService.removeCategorySubscription(user, category)
        } yield result

        marshalResponse(res)

      case req @ DELETE -> Root / "api" / "subscription" / "category" as user =>
        Forbidden(InvalidUserRole(user.role, List(Role.Client)).message)
    }

    def viewSupplierSubscription(): AuthedRoutes[ReadAuthorizedUser, F] = AuthedRoutes.of[ReadAuthorizedUser, F] {
      case GET -> Root / "api" / "subscription" / "supplier" as user if user.role == Role.Client =>
        for {
          result <- Ok(subscriptionService.getSupplierSubscriptions(user))
        } yield result

      case GET -> Root / "api" / "subscription" / "supplier" as user =>
        Forbidden(InvalidUserRole(user.role, List(Role.Client)).message)
    }

    def viewCategorySubscription(): AuthedRoutes[ReadAuthorizedUser, F] = AuthedRoutes.of[ReadAuthorizedUser, F] {
      case GET -> Root / "api" / "subscription" / "category" as user if user.role == Role.Client =>
        for {
          result <- Ok(subscriptionService.getCategorySubscriptions(user))
        } yield result

      case GET -> Root / "api" / "subscription" / "category" as user =>
        Forbidden(InvalidUserRole(user.role, List(Role.Client)).message)
    }

    subscribeSupplier() <+> subscribeCategory() <+>
      removeCategorySubscription() <+> removeSupplierSubscription() <+>
      viewCategorySubscription() <+> viewSupplierSubscription()
  }
}
