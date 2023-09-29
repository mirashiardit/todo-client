import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const DeleteModal = ({ open, handleClose, taskId, getTasks }) => {
  const deleteTask = () => {
    axios.delete(`http://localhost:3002/todos/${taskId}`).then(() => {
      getTasks();
      handleClose();
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this task?
          </Typography>
          <Stack>
            <Button onClick={handleClose}>Cancel</Button>
            <Button color="error" onClick={deleteTask}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
