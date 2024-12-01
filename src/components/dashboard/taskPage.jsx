import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
} from "../../redux/reducers/taskSlice";

const TaskPage = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);
  console.log("Current Tasks:", tasks);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

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
      dispatch(addTask(formData)).then(() => {
        handleDialogClose();
      });
    } else if (dialogMode === "edit") {
      dispatch(editTask({ ...selectedTask, ...formData })).then(() => {
        handleDialogClose();
      });
    }
  };

  const handleTaskDelete = (taskId) => {
    dispatch(deleteTask(taskId));
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

        {status === "loading" ? (
          <CircularProgress color="inherit" />
        ) : (
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {tasks?.map((task) => (
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
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleDialogOpen("edit", task)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleTaskDelete(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="sm"
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
