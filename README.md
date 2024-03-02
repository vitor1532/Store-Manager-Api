# Project Title

This project is a collaboration between Trybe School and myself. The Dockerfile, docker-compose, and the database setup were provided by Trybe. The rest of the application, including the MSC (Model-View-Controller) architecture, middlewares, and other components, were developed by me.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Docker and Node.js installed on your machine.

### Installing

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Start the application by running `docker-compose up -d`

## Testing

You can test the routes of the application using a HTTP client such as Thunder Client or Postman.

#### Products Routes:

- **GET /products**: Retrieves all products.
- **POST /products**: Creates a new product.
- **GET /products/search**: Searches for products by name.
- **GET /products/:id**: Retrieves a product by its ID.
- **PUT /products/:id**: Updates a product by its ID.
- **DELETE /products/:id**: Deletes a product by its ID.

#### Sales Routes:

- **GET /sales**: Retrieves all sales.
- **POST /sales**: Creates a new sale.
- **GET /sales/:id**: Retrieves a sale by its ID.
- **DELETE /sales/:id**: Deletes a sale by its ID.
- **PUT /sales/:saleId/products/:productId/quantity**: Updates the quantity of a product in a sale.


## Built With

* [Docker](https://www.docker.com/) - Used for containerization
* [Node.js](https://nodejs.org/) - The runtime used

## Authors

* **Trybe School** - *Initial work* - ./docker-compose.yml, ./backend/Dockerfileand ./sql/01-migration.sql, ./sql/02-seed.sql - [Trybe](https://www.betrybe.com/)
* **Vitor Martins de Almeida** - *Further development* - [My GitHub](https://github.com/vitor1532)

## Acknowledgments

* Hat tip to Trybe for providing a awesome learning experience, as well as the linter used in this project