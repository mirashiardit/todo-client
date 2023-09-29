import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit,
  Edit as EditIcon,
} from "@mui/icons-material";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const TaskCard = ({ id, name, description, dueDate, getTasks }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const openEditModal = () => {
    setSearchParams({
      taskId: id,
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dueDate}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={openEditModal}>
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <DeleteModal
        open={deleteModalOpen}
        handleClose={() => {
          setDeleteModalOpen(false);
        }}
        taskId={id}
        getTasks={getTasks}
      />
    </Card>
  );
};
