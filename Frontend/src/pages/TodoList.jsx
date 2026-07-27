import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API_URL}/all-todos/`);

        setTodos(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTodos();
  }, [todos]);

  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/update-todo/${id}`, {
        completed: !completed,
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/delete-todo/${id}`);

      // setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(err);
    }
  };

  const handleCreateTodo = async (e) => {
    try {
      e.preventDefault();

      if (!title || !description) {
        throw new Error("Title and description both are required");
      }

      if (title.trim().length < 3 || description.trim().length < 3) {
        throw new Error("Title or description must be greater than 3");
      }

      if (description.trim().length > 100) {
        throw new Error("Description must be less than 100");
      }

      const res = await axios.post(`${API_URL}/create-todo/`, {
        title,
        description,
      });

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[360px_1fr] gap-10">
        {/* Left Side */}
        <div className="sticky top-10 h-fit">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-800">New Todo</h2>

            <p className="text-gray-500 mt-2 mb-8">
              Organize your tasks efficiently.
            </p>

            <form className="space-y-5" onSubmit={handleCreateTodo}>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Learn Node.js..."
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your task..."
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-white font-semibold transition-all hover:scale-[1.02] active:scale-95">
                + Add Todo
              </button>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">My Todos</h1>

              <p className="text-gray-500 mt-2">2 Tasks • 1 Completed</p>
            </div>
          </div>

          <div className="space-y-6">
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="group bg-white/90 backdrop-blur rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-7"
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h2
                          className={`text-2xl font-bold ${
                            todo.completed
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }`}
                        >
                          {todo.title}
                        </h2>

                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            todo.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {todo.completed ? "Completed" : "Pending"}
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        {todo.description}
                      </p>
                    </div>

                    {/* Toggle */}
                    <label
                      className="relative inline-flex items-center cursor-pointer ml-6"
                      onClick={() => handleToggle(todo._id, todo.completed)}
                    >
                      <input
                        type="checkbox"
                        //   checked={todo.completed}
                        className="sr-only peer"
                        readOnly
                      />

                      <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all after:content-[''] after:absolute after:top-[23px] after:left-1 after:bg-white after:w-6 after:h-6 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 mt-7">
                    <button  onClick={() => navigate(`/todos/${todo._id}`)} className="rounded-xl border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100 transition">
                      Details
                    </button>

                    <button onClick={() => handleDelete(todo._id)} className="rounded-xl border border-red-500/50  hover:bg-red-600 text-red-500/90 hover:text-white px-5 py-2 font-medium transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
