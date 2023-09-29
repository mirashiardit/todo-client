import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSearchParams } from "react-router-dom";

export default function Header({ getTasks }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSearchParams({});
  };

  useEffect(() => {
    if (searchParams.has("taskId")) {
      setDrawerOpen(true);
    }
  }, [searchParams]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              handleDrawerOpen();
            }}
          >
            Add New Task
          </Button>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={drawerOpen}
        onClose={handleDrawerClose}
        getTasks={getTasks}
      />
    </Box>
  );
}
