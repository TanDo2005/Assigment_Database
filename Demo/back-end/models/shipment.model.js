export default(sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ShipmentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DeliveryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ShippingFee: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'Shipment',
    timestamps: false
  });

  return Shipment;
};
