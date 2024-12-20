# Backend Uber API Documentation

## Endpoints

### /user/register

**Description:**
Registers a new user.

**Method:**
POST

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

**Responses:**

- **201 Created**
  - **Description:** User successfully registered.
  - **Body:**
    ```json
    {
      "user": {
        "_id": "string",
        "fullname": {
          "firstname": "string",
          "lastname": "string"
        },
        "email": "string",
        "socketId": "string (optional)"
      },
      "token": "string"
    }
    ```

- **400 Bad Request**
  - **Description:** Validation error or missing required fields.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "string",
          "param": "string",
          "location": "string"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description:** An error occurred on the server.
  - **Body:**
    ```json
    {
      "error": "string"
    }
    ```
