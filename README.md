# Todo Application

A full-stack Todo Application built as part of the coding challenge.

## Tech Stack

### Frontend

- React
- React Router
- CSS

### Backend

- Node.js
- Express.js

### Data Storage

- MongoDB Database

---

# Project Structure

```text
todo-app/
├── frontend/
├── backend/
├── docs/
└── README.md
```

---

# Features

## Todo List Page

- View all todos
- Create a new todo
- Edit an existing todo
- Delete a todo
- Mark todo as completed
- Search todos _(Optional)_
- Filter todos _(Optional)_

## Todo Details Page

- Displays details for a single todo
- Receives the todo ID as a query parameter

Example:

```
/todo?id=1
```

The page displays:

- Title
- Description
- Status
- Created Date
- Last Updated Date

---

# Backend API

## Todos

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/todos`     | Get all todos  |
| GET    | `/todos/:id` | Get todo by ID |
| POST   | `/todos`     | Create todo    |
| PUT    | `/todos/:id` | Update todo    |
| DELETE | `/todos/:id` | Delete todo    |

---

# Running the Project

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Documentation

Additional documentation can be found inside the `docs/` directory.

Example:

```
docs/
├── API.md
├── FEATURES.md
└── SETUP.md
```

---

# Status

🚧 Work in Progress
