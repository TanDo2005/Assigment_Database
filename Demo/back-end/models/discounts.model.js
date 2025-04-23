export default (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    DiscountID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    BookID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DiscountPercentage: {
      type: DataTypes.INTEGER,
      validate: {
        min: 5,
        max: 100
      }
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Discounts',
    timestamps: false
  });

  return Discount;
};
