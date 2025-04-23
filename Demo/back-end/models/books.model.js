export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PublishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AuthorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GenreID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Books',
    timestamps: false
  });

  return Book;
};
