export default(sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    DateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'User',
    timestamps: false
  });

  return User;
};
