import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TodoList from './pages/TodoList';
import TodoDetail from './pages/TodoDetail';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
      </Routes>
    </Router>
  )
}

export default App