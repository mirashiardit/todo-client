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
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function TaskForm({ getTasks, onClose }) {
  const [searchParams] = useSearchParams();

  const taskId = searchParams.get("taskId");

  const [task, setTask] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (taskId) getTask();
  }, [taskId]);

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

  const getTask = () => {
    axios.get(`http://localhost:3002/todos/${taskId}`).then((response) => {
      setTask(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
    });
  };

  const updateTask = () => {
    axios
      .put(`http://localhost:3002/todos/${taskId}`, {
        name,
        description,
      })
      .then(() => {
        onClose();
        getTasks();
      });
  };

  return (
    <form className="task-form">
      <Typography variant="h5" className="task-form-title">
        {taskId ? "Edit Task" : "Create a New Task"}
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
            value={name}
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
            value={description}
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

        <Button
          variant="outlined"
          color="primary"
          onClick={taskId ? updateTask : createTask}
        >
          {taskId ? "Edit" : "Create"}
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
