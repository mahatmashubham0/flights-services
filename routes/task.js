import express from "express";
import {
  deleteTask,
  getTasks,
  getTask,
  updateTask,
  createTask,
  getTasksByStatus,
  getTasksById,
  changeTaskPriority
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/tasks', createTask);

router.get('/tasks', getTasks);

router
  .route("/tasks/:status")
  .get(isAuthenticated, getTasksByStatus)

router
.route("/tasks/:priority")
.get(isAuthenticated, changeTaskPriority)

router
.route("/tasks/info/all")
.get(isAuthenticated, getTasksById)

router.get('/tasks/info/:id', getTask);
router.put('/tasks/info/:id', updateTask);
router.delete('/tasks/info/:id', deleteTask);

export default router;
