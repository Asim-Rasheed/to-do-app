import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMe, logout } from "../app/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 "
     style={{ background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%"}}>
      <div className="card p-4 shadow-sm text-center" style={{ minWidth: "350px" }}>
        <h2 className="mb-4 text-success">
          Welcome {user?.role}
        </h2>

        {user?.role === "Admin" ? (
          <button
            className="btn btn-primary mb-3 w-100"
            onClick={() => navigate("/viewtasks")}
          >
            View All Tasks
          </button>
        ) : (
          <>
            <button
              className="btn btn-success mb-3 w-100"
              onClick={() => navigate("/createtask")}
            >
              Create Task
            </button>
            <button
              className="btn btn-info mb-3 w-100"
              onClick={() => navigate("/viewtasks")}
            >
              View My Tasks
            </button>
          </>
        )}

        <button
          className="btn btn-danger mt-3 w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
