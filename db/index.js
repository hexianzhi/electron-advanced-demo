const { app } = require("electron");
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(app.getPath("desktop"), "test.db"),
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

const main = async () => {
  await sequelize.sync();

  try {
    await sequelize.authenticate();
    const jane = await User.create({
      username: "janedoe",
      birthday: "1991.1.2",
    });
    console.log(jane.toJSON());

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const addUser = async (user) => {
  User.create(user);
};

const deleteUser = async ({ name }) => {
  await User.destroy({
    where: {
      username: name,
    },
  });
};

const updateUser = async ({ originName, newName }) => {
  await User.update(
    { username: newName },
    {
      where: {
        username: originName,
      },
    }
  );
};

const findUser = async ({ username }) => {
  // 查询所有用户
  const users = await User.findAll({
    raw: true,
    where: {
      username,
    },
  });
  return users;
};

module.exports = { main, addUser, deleteUser, updateUser, findUser };
