import { Drawer } from "@mui/material";
import TaskForm from "./TaskForm";

export default function Sidebar({ open, onClose, getTasks }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <TaskForm getTasks={getTasks} onClose={onClose}/>
    </Drawer>
  );
}
