import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword});

    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({ token });
  } catch(error) {
    res.status(500).json({error: 'Error trying to register '});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    console.log(email);
    const user = await User.findOne({ where: { email } });
    if(!user) return res.status(404).json({error: 'User not found' });

    const isMatch =  await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({error: 'Incorrect Password'});
    console.log(email);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email }});
    //res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error){
    res.status(500).json({ error: 'Error starting session'});
  }
};

export {register, login};