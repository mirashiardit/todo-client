import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import "../styles/task-list.css";
import { DeleteModal } from "./DeleteModal";
import { TaskCard } from "./TaskCard";

export default function TaskList({ tasks, getTasks }) {

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskCard {...task} getTasks={getTasks}/>
      ))}
    </div>
  );
}
