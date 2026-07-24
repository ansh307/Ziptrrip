# Todo API Documentation

Base URL

```
/api/v1/todo
```

---

# Health Check

Checks whether the server is running.

### Request

```http
GET /health
```

### Response

```json
{
  "success": true,
  "status": "ok"
}
```

---

# Create Todo

Creates a new todo.

### Request

```http
POST /api/v1/todo/create-todo
```

### Body

```json
{
  "title": "Learn React",
  "description": "Complete React Router",
  "completed": false
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "687f7a1234567890abcdef12",
    "title": "Learn React",
    "description": "Complete React Router",
    "completed": false,
    "createdAt": "2026-07-24T12:00:00.000Z",
    "updatedAt": "2026-07-24T12:00:00.000Z"
  }
}
```

---

# Get All Todos

Returns all todos.

### Request

```http
GET /api/v1/todo/all-todos
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "_id": "687f7a1234567890abcdef12",
      "title": "Learn React",
      "description": "Complete React Router",
      "completed": false
    },
    {
      "_id": "687f7a9876543210abcdef34",
      "title": "Build Todo API",
      "description": "Implement CRUD operations",
      "completed": true
    }
  ]
}
```

---

# Get Todo By ID

Returns a single todo.

### Request

```http
GET /api/v1/todo/get-todo/:id
```

### Example

```http
GET /api/v1/todo/get-todo/687f7a1234567890abcdef12
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "687f7a1234567890abcdef12",
    "title": "Learn React",
    "description": "Complete React Router",
    "completed": false
  }
}
```

---

# Update Todo

Updates an existing todo.

### Request

```http
PUT /api/v1/todo/update-todo/:id
```

### Body

```json
{
  "title": "Learn React.js",
  "description": "Finish React Router DOM",
  "completed": true
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "687f7a1234567890abcdef12",
    "title": "Learn React.js",
    "description": "Finish React Router DOM",
    "completed": true
  }
}
```

---

# Delete Todo

Deletes a todo.

### Request

```http
DELETE /api/v1/todo/delete-todo/:id
```

### Example

```http
DELETE /api/v1/todo/delete-todo/687f7a1234567890abcdef12
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

---

# Common Status Codes

| Status Code | Description                    |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Resource created successfully  |
| 400         | Invalid request                |
| 404         | Resource not found             |
| 500         | Internal server error          |
