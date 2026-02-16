const {User}=require("../model/User.js");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
        if (!name) {
            return res.status(400).json({ message: "Enter user name" })
        }
        if (!email || !password) {
            return res.status(400).json({ message: " Email and passowrd required!" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: " User alreaady existed!" })
        }

        const passwordRegex = /^(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(401).json({ message: "Passsowrd must contain six character and one numeric value" })
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed, name, role })
        res.status(201).json({ message: " User successfully registered", user: { name: user.name, email: user.email } })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found!' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token, user });

  }     catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports={login, register};