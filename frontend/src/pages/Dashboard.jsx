import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
const navigate = useNavigate();
const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!task) return;

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTask("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, []);
  return (
  <div className="dashboard-container">
    <div className="dashboard-card">

      <div className="dashboard-header">
        <div>
          <p className="welcome-text">
  Welcome back, Tejaswini 👋
</p>
          <h1 className="dashboard-title">
            TaskFlow Dashboard
          </h1>

          <p className="welcome-text">
            Welcome to your productivity dashboard 🚀
          </p>
          
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="stat-box">
          <h3>
            {
              tasks.filter(
                (task) =>
                  task.status === "Pending"
              ).length
            }
          </h3>
          <p>Pending</p>
        </div>

        <div className="stat-box">
          <h3>
            {
              tasks.filter(
                (task) =>
                  task.status === "Completed"
              ).length
            }
          </h3>
          <p>Completed</p>
        </div>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {tasks.map((item) => (
        <div
          className="task-card"
          key={item._id}
        >
          <div>
            <div className="task-info">
              {item.title}
            </div>

            <div className="task-status">
              Status: {item.status}
            </div>
          </div>

          <div className="task-actions">
            <select
              value={item.status}
              onChange={(e) =>
                updateStatus(
                  item._id,
                  e.target.value
                )
              }
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <button
              className="delete-btn"
              onClick={() =>
                deleteTask(item._id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="footer">
        TaskFlow © 2026
      </div>

    </div>
  </div>
);
}

export default Dashboard;