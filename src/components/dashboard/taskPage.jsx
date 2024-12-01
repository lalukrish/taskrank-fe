import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const TaskPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Description for Task 1" },
    { id: 2, title: "Task 2", description: "Description for Task 2" },
    { id: 3, title: "Task 3", description: "Description for Task 3" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleDialogOpen = (mode, task = null) => {
    setDialogMode(mode);
    setOpenDialog(true);
    if (task) {
      setSelectedTask(task);
      setFormData({
        title: task.title,
        description: task.description,
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTask(null);
    setFormData({ title: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskSave = () => {
    if (dialogMode === "create") {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: formData.title,
          description: formData.description,
        },
      ]);
    } else if (dialogMode === "edit") {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id
            ? {
                ...task,
                title: formData.title,
                description: formData.description,
              }
            : task
        )
      );
    }
    handleDialogClose();
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/loginbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box p={4} sx={{ zIndex: 1, width: "100%" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="h4" fontWeight="bold">
            My Tasks
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleDialogOpen("create")}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Add Task
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {status === "loading" ? (
            <Typography>Loading...</Typography>
          ) : (
            tasks?.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id} sx={{ mt: 8 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    position: "relative",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {task.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {task.description}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    position="absolute"
                    bottom={16}
                    right={16}
                    gap={1}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "row" },
                      gap: 1,
                      "@media (max-width: 600px)": {
                        position: "relative",
                        bottom: "auto",
                        left: 40,
                        width: 40,
                      },
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleDialogOpen("edit", task)}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleTaskDelete(task.id)}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="sm"
          sx={{ zIndex: 2 }}
        >
          <DialogTitle>
            {dialogMode === "create" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={formData.description}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleTaskSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Grid>
  );
};

export default TaskPage;
