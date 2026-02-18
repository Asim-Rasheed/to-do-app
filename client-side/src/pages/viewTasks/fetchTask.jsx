
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../../app/taskSlice";
import { fetchMe } from "../../app/authSlice";
import TaskTable from "./taskTable";

export default function FetchTask() {
  const dispatch = useDispatch();

  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchTasks());
  }, [dispatch]);

   const handleTaskComplete = (taskId) => {
    dispatch(updateTaskStatus(taskId));
  };

  return (
    <div
  className="min-vh-100 d-flex justify-content-center align-items-start py-5"
  style={{
    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  }}>
    <div className="container my-5" 
    >
      <h2 className="text-center mb-4 underlined  white">
        {user?.role === "Admin" ? "All Tasks" : "My Tasks"}
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <TaskTable
        tasks={tasks}
        user={user}
        onComplete={handleTaskComplete}
      />
    </div>
    </div>
  );
}
