module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
  });

  return users;
}