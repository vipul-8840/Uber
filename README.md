# User Registration Endpoint Documentation

## Endpoint
`POST /user/register`

## Description
This endpoint allows a new user to register by providing their first name, last name, email, and password. The user data is validated and stored in the database, and a JWT token is generated upon successful registration.

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

### Example
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

## Response
### Success
- **Status Code:** 201 Created
- **Body:**
  ```json
  {
      "user": {
          "_id": "user_id",
          "fullname": {
              "firstname": "John",
              "lastname": "Doe"
          },
          "email": "john.doe@example.com",
          "socketId": null
      },
      "token": "jwt_token"
  }
  ```

### Validation Errors
- **Status Code:** 400 Bad Request
- **Body:**
  ```json
  {
      "errors": [
          {
              "msg": "Error message",
              "param": "field_name",
              "location": "body"
          }
      ]
  }
  ```

### Missing Fields
- **Status Code:** 400 Bad Request
- **Body:**
  ```json
  {
      "message": "All Fields are required"
  }
  ```

## Notes
- Ensure that the email provided is unique and not already registered in the system.
- The password is hashed before being stored in the database for security purposes.
- A JWT token is generated and returned in the response for authentication purposes.