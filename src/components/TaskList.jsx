import { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "../styles/task-list.css";

export default function TaskList({ tasks, getTasks }) {
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.dueDate}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
