export default (sequelize, DataTypes) => {
  const BookReview = sequelize.define('BookReview', {
    ReviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BookID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    Comment: {
      type: DataTypes.STRING(200)
    },
    ReviewDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BookReviews',
    timestamps: false
  });

  return BookReview;
};
