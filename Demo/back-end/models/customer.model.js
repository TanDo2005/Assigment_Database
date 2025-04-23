export default (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    BankName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    BankNum: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Customer',
    timestamps: false
  });

  return Customer;
};
