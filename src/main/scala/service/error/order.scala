package service.error

import domain.order.OrderStatus
import service.error.general.{BadRequestError, GeneralError, NotFoundError}

object order {
  trait OrderError extends GeneralError

  object OrderError {
    final case class OrderNotFound(id: String) extends OrderError with NotFoundError {
      override def message: String = s"Order with id $id doesn't exist"
    }

    final case class ProductIsNotAvailable(id: String) extends OrderError with BadRequestError {
      override def message: String = s"Product with id $id doesn't exist or is not available to be ordered"
    }

    final case class DuplicatedProductInOrder(id: String) extends OrderError with BadRequestError {
      override def message: String = s"Product with $id was found in the order more than once"
    }

    final case object EmptyOrder extends OrderError with BadRequestError {
      override def message: String = "Order should have at least 1 product with its count"
    }

    final case class InvalidStatusToUpdate(currentStatus: OrderStatus, newStatus: OrderStatus)
      extends OrderError
        with BadRequestError {
      override def message: String =
        s"You can't change order status to $newStatus if its current status is $currentStatus\n" +
          s"Schema of statuses :" +
          s"\t-ordered -> cancelled,assigned" +
          s"\t-cancelled -> None" +
          s"\t-assigned -> delivered" +
          s"\t-delivered -> None"
    }
  }
}
