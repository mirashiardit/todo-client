import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import "../styles/task-form.css";
import { useState } from "react";
import axios from "axios";

export default function TaskForm({ getTasks, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [validationError, setValidationError] = useState("");

  const createTask = () => {
    if (name.length > 0 && description.length > 0) {
      axios
        .post("http://localhost:3002/todos", {
          name,
          description,
          dueDate: new Date(),
        })
        .then(() => {
          onClose();
          getTasks();
        });
    } else {
      setValidationError(
        "Form is invalid. Please fill the required inputs name and description."
      );
    }
  };

  return (
    <form className="task-form">
      <Typography variant="h5" className="task-form-title">
        Create a New Task
      </Typography>
      <div className="task-form-body">
        <FormControl>
          <TextField
            id="name"
            aria-describedby="name-helper-text"
            onChange={(event) => {
              setValidationError("");
              setName(event.target.value);
            }}
            placeholder="Name"
          />
          <FormHelperText id="name-helper-text">
            Type the name of the task
          </FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            aria-describedby="description-helper-text"
            onChange={(event) => {
              setValidationError("");
              setDescription(event.target.value);
            }}
            placeholder="Description"
          />
          <FormHelperText id="description-helper-text">
            Type the description of the task
          </FormHelperText>
        </FormControl>
      </div>

      {/* <FormControl>
        <InputLabel htmlFor="my-input">Due Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Basic date picker" />
          </DemoContainer>
        </LocalizationProvider>
        <FormHelperText id="dueDate-helper-text">
          Type the description of the task
        </FormHelperText>
      </FormControl> */}

      <div className="task-form-buttons">
        <Button variant="text" color="primary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="outlined" color="primary" onClick={createTask}>
          Create
        </Button>
      </div>

      <Snackbar
        open={validationError.length > 0}
        autoHideDuration={3000}
        message={validationError}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
    </form>
  );
}
