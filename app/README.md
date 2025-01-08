# Task Documentation

Backend Developer coding task
in this is task I am using

- Node.js - Express.js - MongoDB - Mongoose - JWT - bcrypt - express-validator

## Task Structure

```
app/
├── src/
│   ├── controllers/
│   │   └── product.controllers.js
|   |   └── auth.controllers.js
│   ├── db/
│   │   └── connectMongo.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validateProduct.middleware.js
│   │   └── validateUser.middleware.js
│   ├── models/
│   │   └── product.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   └── products.router.js
│   │   └── auth.router.js
│   │   └── index.router.js
│   └── server.js
├── .env
└── index.js
```

###

index.js

This is the entry point of the application. It loads environment variables, connects to the MongoDB database, and starts the server.

### `src/db/connectMongo.js`

This module handles the connection to the MongoDB database using Mongoose.

and inside the db folder there is a dummy data I used to test APIs

### `src/server.js`

This module sets up the Express server and applies middleware.

and use some custom middleware to increase the security of the application

as using helmet that helps secure the application by setting various HTTP headers.
using mongoSanitize to prevent NoSQL Injection
using cors to allow cross-origin requests
using xss-clean to prevent XSS attacks

and there is a custom error handler to handle errors in the application

### `src/models/`

the models folder contains the schema definitions for the application.

and each schema is defined in a separate file.

and inside them we using mongoose middleware (hooks) that can make specific actions before or after the main action

as hashing the password before saving the user to the database

### `src/routes/`

This folder contains route definitions for different parts of the application.
contain the main router that will be used in the server.js file
and the products router that will be used to handle the products requests
as get products, get product by id, add new product, update product, delete product
and the auth router that will be used to handle the authentication requests as login and signup

### `src/controllers/`

the controllers folder contains the logic for handling requests and responses for each route.

and inside an auth controller, we have the logic for handling the login and signup requests and create a token for the user inside it

we provide controller for signup and login and change-role that will be implemented just by the admin

### `src/middlewares/`

This folder contains middleware functions that can be used to perform operations before handling requests.
as validation middleware that will be used to validate the product data before adding or updating it using express-validator

and auth middleware that will be used to protect the routes by using jwt to verify the token and check the user role

### `src/utils/`

This folder contains utility functions that can be used across the application.

as catchError that has some functions and middleware to handle the errors in the application

## Environment Variables

The application uses the following environment variables:

- CONNECTION_URI: MongoDB connection string.
- PORT : Port number on which the server will run.
- JWT_TOKEN_SECREt: which is used to sign the token and verify it
- EXPIRES_IN: the token expiration time

## API Endpoints

-- Auth Routes

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login an existing user.
- `POST /api/auth/change-role`: change the user role (protected, admin only).

-- Product Routes

- `GET /api/products`: Retrieve all products.
- `POST /api/products`: Add a new product (protected, admin only).
- `GET /api/products/:id`: Retrieve a product by ID.
- `PUT /api/products/:id`: Update a product by ID (protected, admin only).
- `DELETE /api/products/:id`: Delete a product by ID (protected, admin only).
