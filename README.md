# Nest.js Authentication and Authorization API

This is a backend service built with Nest.js, MongoDB, RabbitMQ, and JWT for authentication and authorization. The service supports user registration and login, using hashed passwords and JSON Web Tokens (JWT) to secure user data.

### Technologies used:

- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database for storing user data.
- **RabbitMQ**: A message broker for handling message queues.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.

## Features:

1. **User Registration**:
   - Registers new users and hashes their passwords using `bcryptjs`.
   - Automatically generates a JWT token upon successful registration.
2. **User Login**:

   - Validates user credentials (email and password).
   - Issues a JWT token on successful login.

3. **Environment Variables**:
   The following environment variables need to be set in the `docker-compose.yml`:

   - `MONGO_URI`: The MongoDB connection string.
   - `JWT_SECRET`: The secret key used to sign JWT tokens.
   - `RABBITMQ_URL`: The URL for RabbitMQ.

4. **Environment Configuration**:
   The service can be configured using environment variables specified in the `docker-compose.yml` file.

## How to Run:

### Running with Docker:

Ensure Docker is installed on your machine. Run the following commands to get started:

```bash
docker-compose build --no-cache
docker-compose up
```

### Endpoints:

- **POST /auth/register**: Registers a new user. Requires `email`, `password`, `firstName`, and `lastName`.
- **POST /auth/login**: Logs in a user and returns a JWT. Requires `email` and `password`.

### Author:

This project was built by **Yonathan Andika Pelealu**.

### License:

This project is licensed under the MIT License.
