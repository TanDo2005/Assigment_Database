export default(sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    GenreID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    GenreName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'Genres',
    timestamps: false
  });

  return Genre;
};
