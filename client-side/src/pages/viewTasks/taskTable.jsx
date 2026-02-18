
export default function TaskTable({ tasks, user, onComplete }) {
  if (!tasks || tasks.length === 0) {
    return <div className="alert alert-warning text-center">No tasks found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-success">
          <tr>
            <th>#</th>

            {/* Show user column only for Admin */}
            {user.role === "Admin" && <th>User</th>}

            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>

              {user.role === "Admin" && (
                <td>{task.user.name}</td>
              )}

              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed ? "✅" : "❌"}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>

              <td>
                <button
                  type="button"
                  className={`btn btn-sm ${task.completed ? "btn-success" : "btn-warning"}`}
                  onClick={() => onComplete(task._id)}
                  disabled={task.completed}
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
