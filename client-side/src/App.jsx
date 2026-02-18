import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateTask from "./pages/createTask";
import Dashboard from "./pages/dashboard";
import FetchTask from "./pages/viewTasks/fetchTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/createtask" element={<CreateTask/>}/>
         <Route path="/viewtasks" element={<FetchTask/>}/>
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
