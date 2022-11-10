# Supplier portal server

 Supplier portal is a server-side application that gives suppliers a possibility to manage their products, so the clients are able to browse and order the products provided by multiple suppliers.


## Stack

- Scala
- Http4s
- ScalaTest
- Cats Core/Effect
- Circe
- Doobie

## Requirements

- Docker
- Docker-compose (version >= 3.9)

## Usage

```shell
docker-compose up -d docker/docker-compose.yml
```

After this command you will see 3 running containers : DB, main server and scheduler for email notification

## API

* ### POST Host/api/auth
authenticate user with login and password

* ### POST Host/api/order
create order for customer

* ### PUT Host/api/order/{id}
cancel customer order by order id

* ### GET Host/api/order
view active orders for product

***

* ### POST Host/api/product 
add product to manager`s shop

* ### PUT Host/api/product
update manager`s product

* ### DELETE Host/api/product/{id}
delete manager`s product by product id

* ### GET Host/api/product
view manager`s products

* ### POST Host/api/product/search
search product from all existing products

* ### POST Host/api/product/attachment
add attachment to product(image)

* ### DELETE Host/api/product/attachment/{id}
remove attachment from product by attachment id

***
