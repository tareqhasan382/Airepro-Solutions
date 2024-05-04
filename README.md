# Backend Developer Assignment Node.js with mySQL

This project is a backend application developed with Node.js, MySQL, Express.js, and cron job integration. It implements CRUD (Create, Read, Update, Delete) operations on a MySQL database for managing products and integrates a cron job to periodically fetch data from an external API and post it to the sales table.

## Features

- CRUD Operations: Implements functionalities to manage products in the database.

  - Create: Adds a new product to the database.
  - Read: Retrieves a list of all products or a single product by ID.
  - Update: Updates the details of an existing product.
  - Delete: Deletes a product from the database.

- Cron Job Integration: Sets up a cron job that runs every hour to fetch data from an external API and post it to the sales table.

- Error Handling : Proper error-handling mechanisms are implemented for database operations, API calls, and cron job execution.

## Technology Stack

- Node.js: Backend JavaScript runtime environment.
- MySQL: Relational database management system.
- Express.js: Web application framework for Node.js, used for building RESTful APIs.
- node-cron: Library for scheduling and executing cron jobs in Node.js.

## Endpoints

- BASE_URL = http://localhost:8000/api/v1
- POST api/v1/
- GET api/v1/
- GET api/v1/
- GET api/v1/
