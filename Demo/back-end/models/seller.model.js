export default(sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    TotalSales: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    TotalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'Seller',
    timestamps: false
  });

  return Seller;
};
