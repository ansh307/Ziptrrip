import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL || "/api/v1/todo";

const TodoDetail = () => {
  const [todo, setTodo] = useState();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-todo/${params.id}`);
        setTodo(res.data.data);
        setNewTitle(res.data.data.title);
        setNewDescription(res.data.data.description);

        // console.log(newTitle, newDescription, newCompleted);
        // console.log(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchTodo();
  }, [params.id]);

  const handleToggle = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/update-todo/${id}`, {
        completed: !completed,
      });

      setTodo(res.data.data);

      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      const changedData = {};

      if (todo.title !== newTitle) {
        changedData.title = newTitle;
      }
      if (todo.description !== newDescription) {
        changedData.description = newDescription;
      }

      if (Object.keys(changedData).length === 0) {
        throw new Error("No changes made");
      }
      const res = await axios.put(`${API_URL}/update-todo/${todo._id}`, changedData);

      setTodo(res.data.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

    const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/delete-todo/${id}`);
      console.log(res.data);
      navigate("/todos");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/todos")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition font-medium"
        >
          ← Back to Todos
        </button>

        {/* Card */}
        {todo && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {editing && <p className="pl-8 pt-4 font-bold">Editing Mode</p>}
            {/* Header */}
            <div className="border-b border-gray-200 p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  {editing ? (
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => setNewTitle(e.target.value)}
                      value={newTitle}
                      className="text-4xl font-bold text-gray-900 outline-none resize-none transition focus:ring-0"
                    />
                  ) : (
                    <h1
                      className={`text-4xl font-bold ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.title}
                    </h1>
                  )}

                  {!editing && 
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      todo.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                  }
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6 text-sm text-gray-500">
                  <div>
                    <p className="font-medium text-gray-700">Created</p>
                    <p>{todo.createdAt}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700">Last Updated</p>
                    <p>{todo.updatedAt}</p>
                  </div>
                </div>
              </div>

              {/* Toggle */}
              {!editing && 
               <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">
                  Completed
                </span>

                <label
                  className="relative inline-flex cursor-pointer items-center"
                  onClick={() => handleToggle(todo._id, todo.completed)}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="peer sr-only"
                  />

                  <div className="h-8 w-14 rounded-full bg-gray-300 transition peer-checked:bg-green-500 after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-6"></div>
                </label>
              </div>
              }
             
            </div>

            {/* Description */}
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              {editing ? (
                <textarea
                  rows={5}
                  name="description"
                  onChange={(e) => setNewDescription(e.target.value)}
                  value={newDescription}
                  className="mt-2 w-full rounded-xl outline-none resize-none transition focus:ring-0"
                />
              ) : (
                <p className="text-gray-600 leading-8">{todo.description}</p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 flex flex-wrap justify-end gap-4">
              <button
                className={`rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100 transition ${todo.completed ? "text-gray-400 cursor-not-allowed" : "text-gray-800"}`}
                disabled={todo.completed}
                onClick={() => {
                   if (editing) {
                    handleUpdateTodo();
                  } else {
                    setEditing(true);
                  }
                }}
              >
                {editing ? "Save Changes" : "Edit Todo"}
              </button>

              <button
                className={`rounded-xl border border-red-500/50   px-6 py-3 font-medium transition ${editing ? "text-red-500/50 cursor-not-allowed" : "text-red-500/90 hover:bg-red-600 hover:text-white"}`}
                disabled={editing}
                onClick={() => handleDelete(todo._id)}
              >
                Delete Todo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetail;
