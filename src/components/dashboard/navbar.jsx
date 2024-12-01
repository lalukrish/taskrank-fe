import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("USER_ID");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("TOKEN");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_POINT}/user/user-logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      setAlert({
        open: true,
        message: "Logout successful",
        severity: "success",
      });
      navigate("/login");
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || "Logout failed",
        severity: "error",
      });
    }
  };

  if (!user) return <div>No user found</div>;

  return (
    <Box sx={{ position: "relative", zIndex: 1, height: 30 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: "url('/dashbaordImg.jpg')",
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "white",
          backdropFilter: "blur(14px)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "start", cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                pr: { md: 14, sm: 9 },
              }}
            >
              <Link to="/taskpage" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "white",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "blue",
                    },
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: { md: 20, sm: 10 },
                  }}
                >
                  Tasks
                </Typography>
              </Link>
              <Link to="/taskrank" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "white",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "blue",
                    },
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: { md: 20, sm: 10 },
                  }}
                >
                  Ranking
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: isMobile ? "none" : "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "white",
                pl: 3,
                pr: 3,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: "black" }}
              >
                {user?.name}
              </Typography>
              <IconButton onClick={handleOpenMenu}>
                <Avatar alt={user?.name} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: { padding: "0.5rem", backgroundColor: "white" },
                }}
              >
                <MenuItem onClick={() => navigate("/settings")}>
                  <Typography>Settings</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                display: isMobile ? "flex" : "none",
                alignItems: "center",
                gap: 1,
                borderRadius: 4,
              }}
            >
              <IconButton onClick={handleOpenMenu}>
                <Avatar alt={user?.name} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: { padding: "0.5rem", backgroundColor: "white" },
                }}
              >
                <MenuItem>
                  <Typography>{user?.name}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Navbar;
