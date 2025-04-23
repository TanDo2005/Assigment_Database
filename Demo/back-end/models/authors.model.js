export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    AuthorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Nationality: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'Authors',
    timestamps: false
  });

  return Author;
};
