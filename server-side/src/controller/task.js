const { Task } = require("../model/User.js")

const createTask = async (req, res) => {
    try {
            
    if (req.user.role === "Admin") {
      return res.status(403).json({ message: "Admins only view the taskcreated by users" });
    }
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(401).json({ message: "Title and description required" });
        }

        const task = await Task.create({
            title,
            description,
            user: req.user.id
        });

        res.status(201).json({ message: "Task created", task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


const accessTask = async (req, res) => {
    try {
        let tasks;
        if (req.user.role == "Admin") {
            tasks = await Task.find().populate("user", "name email");
        }
        else {
            tasks = await Task.find({ user: req.user.id })
        }
        return res.status(201).json({ tasks })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }
}

const markTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params; 

    const task = await Task.findById(id).populate("user", "name email");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed; 
    await task.save();

    return res.status(200).json({ message: "Task marked as completed", task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createTask, accessTask, markTaskCompleted}