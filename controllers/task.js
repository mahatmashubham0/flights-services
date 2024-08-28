import { Task } from "../models/task.js";

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status , user } = req.body;
  console.log(req.body , typeof user);

  if (!title || !description || !dueDate || !priority) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newTask = new Task({ title, description, dueDate, priority, status, 
      user: user
    });
    await newTask.save();
    res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Fetch tasks with filters
export const getTasks = async (req, res) => {
  try {
    const { priority, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (priority) {
      query.priority = priority;
    }

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      tasks,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get a task according the status of task
export const getTasksByStatus = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const status = req.params.status;

  console.log(page , limit , skip ,typeof String(req.params), status, ['pending', 'completed'].includes(status));
  if (!['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const tasks = await Task.find({ status: status, user: req.user._id }).skip(skip).limit(limit);
    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      message: "got Data successfully",
      tasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


// get a task according the priority of task
export const changeTaskPriority = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;

  if (!['high', 'medium', 'low'].includes(priority)) {
    return res.status(400).json({ message: 'Invalid priority' });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.priority = priority;
    await task.save();

    res.status(200).json({ message: 'Task priority updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


// Get all task by Id that extract by JWT
export const getTasksById = async (req, res, next) => {

  try {
    console.log("new",req.user);
    const tasks = await Task.find({ user: req.user._id })
    const totalTasks = await Task.countDocuments();
    console.log(tasks);

    res.status(201).json({
      message: 'Task got Successfully',
      task: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


// Get a single task
export const getTask = async (req, res , next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    console.log("Hello Chal rha hain", req.params.id);
    const {id} = req.params
    const task = await Task.findById(id);
    console.log(task);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
