import express from "express";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({ extended:true }));
//app.use(express.static("public"));
app.use(bodyParser.json())

// Routes 
app.use('auth', authRoutes);
app.use('/posts', postRoutes);

//Connecting db and server
sequelize.sync()
  .then(() => {
    app.listen(port, () => console.log(`Server running at port: ${port}`));
  })
  .catch(err => console.log('Error connecting db'));
