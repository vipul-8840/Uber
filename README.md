# Backend Uber API Documentation

## Endpoints

### POST /user/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body must be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with at least 3 characters (required)
  - `lastname`: A string with at least 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **201 Created**
  - **Description**: User successfully registered.
  - **Body**: A JSON object containing the user details and authentication token.
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

- **400 Bad Request**
  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

### POST /user/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body must be a JSON object containing the following fields:
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**
  - **Description**: User successfully logged in.
  - **Body**: A JSON object containing the user details and authentication token.
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

- **400 Bad Request**
  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**
  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  ```json
  {
    "message": "invalid email or password"
  }
  ```

### GET /user/profile

#### Description
This endpoint is used to get the profile of the logged-in user.

#### Request Headers
- `Authorization`: Bearer token (required)

Example:
```
Authorization: Bearer jwt_token
```

#### Responses

- **200 OK**
  - **Description**: User profile retrieved successfully.
  - **Body**: A JSON object containing the user details.
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

- **401 Unauthorized**
  - **Description**: Invalid or missing token.
  - **Body**: A JSON object containing the error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### GET /user/logout

#### Description
This endpoint is used to log out the user.

#### Request Headers
- `Authorization`: Bearer token (required)

Example:
```
Authorization: Bearer jwt_token
```

#### Responses

- **200 OK**
  - **Description**: User successfully logged out.
  - **Body**: A JSON object containing the success message.
  ```json
  {
    "message": "Logged Out"
  }
  ```

- **401 Unauthorized**
  - **Description**: Invalid or missing token.
  - **Body**: A JSON object containing the error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### POST /captain/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body must be a JSON object containing the following fields:
- `email`: A valid email address (required)
- `password`: A string with at least 6 characters (required)
- `fullname`: An object containing:
  - `firstname`: A string with at least 3 characters (required)
  - `lastname`: A string with at least 3 characters (optional)
- `vehicle`: An object containing:
  - `color`: A string with at least 3 characters (required)
  - `plate`: A string with at least 3 characters (required)
  - `capacity`: An integer with at least 1 (required)
  - `vehicleType`: A string that must be either 'car', 'bike', or 'auto' (required)

Example:
```json
{
  "email": "captain@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses

- **201 Created**
  - **Description**: Captain successfully registered.
  - **Body**: A JSON object containing the captain details.
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "email": "captain@example.com",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **400 Bad Request**
  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "firstname must be atleast 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "color must be atleast 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "plate must be atleast 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "capacity must be atleast 1",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "vehicle type must be car,bike or auto",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

#### Example Request
```bash
curl -X POST http://localhost:3000/captain/register \
-H "Content-Type: application/json" \
-d '{
  "email": "captain@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```