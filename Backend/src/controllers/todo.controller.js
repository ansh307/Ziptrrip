const todoService = require("../services/todo.service");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Request Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    if (typeof title !== "string" || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title and description must be strings.",
      });
    }

    if (title.trim().length < 3 || title.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 3 and 100 characters.",
      });
    }

    if (description.trim().length < 5 || description.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Description must be between 5 and 1000 characters.",
      });
    }

    const todo = await todoService.createTodo({
      title,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await todoService.getTodoById(todoId);

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error.message);

    if (
      error.message === "Todo not found" ||
      error.message === "Invalid Todo ID"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await todoService.updateTodo(todoId, req.body);

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error.message);

    if (
      error.message === "Todo not found" ||
      error.message === "Invalid Todo ID"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    await todoService.deleteTodo(todoId);

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error.message);

    if (
      error.message === "Todo not found" ||
      error.message === "Invalid Todo ID"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
