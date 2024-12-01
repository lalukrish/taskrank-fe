import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Task, CheckCircle, Star } from "@mui/icons-material";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const data = [
    {
      title: "Active Tasks",
      count: 10,
      icon: <Task fontSize="large" />,
      color: "#DEEFF5",
    },
    {
      title: "Completed Tasks",
      count: 15,
      icon: <CheckCircle fontSize="large" />,
      color: "#ADD8E6",
    },
    {
      title: "Ranked Tasks",
      count: 5,
      icon: <Star fontSize="large" />,
      color: "#DEEFF5",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/dashbaordImg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
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

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box p={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                mt: { md: 0, xs: 4 },
                width: { xs: "80%", sm: "40%", md: "30%" },
                height: { xs: "40%", sm: "40%" },
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={2} color="black">
                Task Overview
              </Typography>
              <ResponsiveContainer height={200}>
                <BarChart data={data} barSize={40}>
                  <XAxis dataKey="title" tick={{ fill: "black" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", color: "black" }}
                  />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            <Box
              sx={{
                ml: { sm: 1 },
                p: 2,
                bgcolor: "transparent",
                color: "white",
                textAlign: "center",
                width: { xs: "100%", sm: "60%" },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    letterSpacing: { md: "-4px", xs: 0 },
                    marginBottom: 1,
                    fontSize: { md: 60, xs: 40 },
                  }}
                >
                  Welcome to Task Management Dashboard
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                  " Manage and track your tasks efficiently! "
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexDirection: { xs: "row", sm: "row" },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 200,
                      height: 50,
                      borderRadius: "30px",
                      boxShadow: 2,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#1976D2",
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      Ranked Tasks
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 200,
                      height: 50,
                      borderRadius: "30px",
                      boxShadow: 2,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#388E3C",
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      Unranked Tasks
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Box>

          <Grid
            container
            spacing={8}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            {data.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: "130px",
                      bgcolor: item.color,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "16px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "90px",
                        height: "40px",
                        p: 1,
                        bgcolor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        /// borderRadius: "50%",
                        boxShadow: 1,
                        mb: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "green", textAlign: "center" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ color: "red" }}
                    >
                      {item.count}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
