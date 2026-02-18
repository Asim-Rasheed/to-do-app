import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../app/taskSlice";


export default function CreateTask() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ title, description }))
      .unwrap()
      .then(() => {
        setSuccessMessage("Task created successfully!");
        setTitle("");
        setDescription("");
        setTimeout(() => setSuccessMessage(null), 1000);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
    style={{ background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%"}}>
      <div className="card p-4 shadow-sm" style={{ minWidth: "400px" }}>
        <h2 className="text-center mb-4 text-success">Create Task</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
