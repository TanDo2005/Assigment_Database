export default(sequelize, DataTypes) => {
  const SellerReview = sequelize.define('SellerReview', {
    ReviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SellerID: {
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
    tableName: 'SellerReviews',
    timestamps: false
  });

  return SellerReview;
};
