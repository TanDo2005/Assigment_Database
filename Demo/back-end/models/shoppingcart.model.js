export default(sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    CartID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    BookID: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    Price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'ShoppingCart',
    timestamps: false
  });

  return ShoppingCart;
};
// Note: Sequelize does support ARRAY for PostgreSQL, but if this causes complexity for future logic (e.g., quantity per book), you might consider a junction table like CartItems.