export default(sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    BooksPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ShipFee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TotalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM('To Pay', 'To Ship', 'To Receive', 'Completed', 'Cancelled', 'Refund'),
    },
    PaidMethod: {
      type: DataTypes.ENUM('Cash', 'Credit Card', 'Bank Transfer'),
    },
    Note: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'Orders',
    timestamps: false
  });

  return Order;
};
