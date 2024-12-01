import React, { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

// Draggable item
const DraggableItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        margin: "10px",
        backgroundColor: "#ffffff",
        cursor: "move",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      {task.title}
    </div>
  );
};

const DropTarget = ({ tasks, onDrop, title }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        padding: "20px",
        minHeight: "300px",
        border: isOver ? "3px solid green" : "2px dashed gray",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {tasks.map((task) => (
          <DraggableItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskRankingPage = () => {
  const [unrankedTasks, setUnrankedTasks] = useState([]);
  const [rankedTasks, setRankedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POINT}/task/get-all-task-asc`
        );
        const tasks = response.data.tasks;
        setUnrankedTasks(tasks.filter((task) => task.rank === null));
        setRankedTasks(tasks.filter((task) => task.rank !== null));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const updateRankAPI = async (taskId, newRank) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_POINT}/task/update-rank`, {
        taskId,
        newRank,
      });
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  const moveToUnrankedAPI = async (taskId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_POINT}/task/move-to-unranked`,
        { taskId }
      );
    } catch (error) {
      console.error("Error moving to unranked:", error);
    }
  };

  const handleDrop = useCallback(
    (taskId) => {
      const task = [...unrankedTasks, ...rankedTasks].find(
        (t) => t.id === taskId
      );
      if (!task) return;

      if (unrankedTasks.find((t) => t.id === taskId)) {
        const newRank = rankedTasks.length + 1;
        setUnrankedTasks(unrankedTasks.filter((t) => t.id !== taskId));
        setRankedTasks([...rankedTasks, { ...task, rank: newRank }]);
        updateRankAPI(taskId, newRank);
      } else {
        setRankedTasks(rankedTasks.filter((t) => t.id !== taskId));
        setUnrankedTasks([...unrankedTasks, { ...task, rank: null }]);
        moveToUnrankedAPI(taskId);
      }
    },
    [unrankedTasks, rankedTasks]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          padding: "20px",
          minHeight: "100vh",
          backgroundImage: "url('/loginbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* <h2 style={{ textAlign: "center", color: "#ffffff" }}>Task Ranking</h2> */}
        <h2 style={{ textAlign: "center", color: "#ffffff", marginTop: 40 }}>
          Use drag and drop here
        </h2>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <DropTarget
            tasks={unrankedTasks}
            onDrop={handleDrop}
            title="Unranked Tasks"
          />
          <DropTarget
            tasks={rankedTasks}
            onDrop={handleDrop}
            title="Ranked Tasks"
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskRankingPage;
