# Todo App Frontend Documentation

## Overview

The frontend is built with **React**, **Vite**, **Tailwind CSS**, **Axios**, and **React Router**. It provides a clean interface for creating, viewing, updating, deleting, and managing todos.

---

# Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

---

# Project Structure

```
src/
├── pages/
│   ├── TodoList.jsx
│   └── TodoDetail.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

# Features

- View all todos
- Create a new todo
- View todo details
- Edit existing todo
- Delete todo
- Toggle completion status
- Responsive UI
- REST API integration

---

# Environment Variables

Create a `.env` file.

```env
VITE_APP_API_URL=http://localhost:5000/api/v1/todo
```

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Move into the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

---

# Routing

| Route        | Description            |
| ------------ | ---------------------- |
| `/todos`     | Displays all todos     |
| `/todos/:id` | Displays a single todo |

---

# Todo List Page

## Features

- Fetches all todos from the backend
- Displays each todo in a card
- Create new todo
- Toggle completed status
- Delete todo
- Navigate to todo details

### API Calls

#### Get All Todos

```http
GET /all-todos
```

#### Create Todo

```http
POST /create-todo
```

#### Update Todo

```http
PUT /update-todo/:id
```

#### Delete Todo

```http
DELETE /delete-todo/:id
```

---

# Todo Detail Page

## Features

- Fetch a single todo
- View title and description
- Toggle completed status
- Edit title
- Edit description
- Save changes
- Delete todo
- Navigate back to Todo List

### API Calls

#### Get Todo

```http
GET /get-todo/:id
```

#### Update Todo

```http
PUT /update-todo/:id
```

#### Delete Todo

```http
DELETE /delete-todo/:id
```

---

# State Management

The application currently uses React Hooks.

```text
useState
useEffect
useNavigate
useParams
```

No external state management library is used.

---

# Axios Integration

Example request:

```javascript
const res = await axios.get(`${API_URL}/all-todos`);
```

The API base URL is read from the environment variable.

```javascript
const API_URL = import.meta.env.VITE_APP_API_URL;
```

---

# Form Validation

Before creating a todo:

- Title is required
- Description is required
- Minimum length: 3 characters
- Maximum description length: 100 characters

---

# UI Components

## Todo List

- Todo Card
- Status Badge
- Completion Toggle
- Delete Button
- Details Button

---

## Todo Detail

- Editable title
- Editable description
- Completion toggle
- Edit mode
- Save changes
- Delete button
- Back navigation

---

# Responsive Design

The application is fully responsive using Tailwind CSS.

Desktop:

- Sidebar form
- Todo cards on the right

Mobile:

- Single-column layout
- Stacked cards
- Responsive spacing

---

# Future Improvements

- Toast notifications
- Loading skeletons
- Error pages
- Search todos
- Filter by status
- Pagination
- Dark mode
- Authentication
- Global state management (Context API or Redux)
- Optimistic UI updates

---

# Available Scripts

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Screens

## Todo List

- View all todos
- Add todo form
- Toggle completion
- Delete todo
- Navigate to details

---

## Todo Detail

- View todo
- Edit todo
- Save changes
- Delete todo
- Toggle completion

---

# Backend Dependency

The frontend requires the Todo API backend to be running.

Default API URL:

```
http://localhost:5000/api/v1/todo
```
