import express from "express";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

// Routes 
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

//Connecting db and server
sequelize.sync()
  .then(() => {
    app.listen(port, () => console.log(`Server running at port: ${port}`));
  })
  .catch(err => console.log('Error connecting db'));
