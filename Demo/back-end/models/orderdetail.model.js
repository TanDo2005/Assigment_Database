export default(sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    BookID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DiscountID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ShipmentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'OrderDetail',
    timestamps: false
  });

  return OrderDetail;
};
