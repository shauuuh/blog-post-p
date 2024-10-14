import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Post.belongsTo(User, { foreignKey: 'userId' });
export default Post;