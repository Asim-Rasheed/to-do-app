const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {type: String, enum:["User", "Admin"], default:"User"}
    }
)
const User = mongoose.model("User", userSchema);

const taskSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }
)

const Task = mongoose.model("Task", taskSchema);

module.exports = { User, Task };