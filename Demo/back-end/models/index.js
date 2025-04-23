import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbConfig from '../config/db.js';

dotenv.config();


// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect, // Neon works with the postgres dialect
//   port: dbConfig.PORT,
//   pool: dbConfig.pool,
//   logging: false,
// });
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  port: 3000,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is important for Neon
    },
  },
  logging: true,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models using ES module syntax
import AuthorModel from './authors.model.js';
import GenreModel from './genres.model.js';
import BookModel from './books.model.js';
import UserModel from './user.model.js';
import CustomerModel from './customer.model.js';
import SellerModel from './seller.model.js';
import ShipmentModel from './shipment.model.js';
import OrderModel from './orders.model.js';
import OrderDetailModel from './orderdetail.model.js';
import BookReviewModel from './bookreviews.model.js';
import SellerReviewModel from './sellerreviews.model.js';
import ShoppingCartModel from './shoppingcart.model.js';
import DiscountModel from './discounts.model.js';

db.Author = AuthorModel(sequelize, Sequelize);
db.Genre = GenreModel(sequelize, Sequelize);
db.Book = BookModel(sequelize, Sequelize);

db.User = UserModel(sequelize, Sequelize);
db.Customer = CustomerModel(sequelize, Sequelize);
db.Seller = SellerModel(sequelize, Sequelize);

db.Shipment = ShipmentModel(sequelize, Sequelize);
db.Order = OrderModel(sequelize, Sequelize);
db.OrderDetail = OrderDetailModel(sequelize, Sequelize);

db.BookReview = BookReviewModel(sequelize, Sequelize);
db.SellerReview = SellerReviewModel(sequelize, Sequelize);

db.ShoppingCart = ShoppingCartModel(sequelize, Sequelize);
db.Discount = DiscountModel(sequelize, Sequelize);

// Define associations
db.Author.hasMany(db.Book, { foreignKey: 'AuthorID' });
db.Genre.hasMany(db.Book, { foreignKey: 'GenreID' });
db.Book.belongsTo(db.Author, { foreignKey: 'AuthorID' });
db.Book.belongsTo(db.Genre, { foreignKey: 'GenreID' });

db.User.hasOne(db.Customer, { foreignKey: 'CustomerID' });
db.Customer.belongsTo(db.User, { foreignKey: 'CustomerID' });

db.User.hasOne(db.Seller, { foreignKey: 'CustomerID' });
db.Seller.belongsTo(db.User, { foreignKey: 'CustomerID' });

db.User.hasMany(db.Order, { foreignKey: 'UserID' });
db.Order.belongsTo(db.User, { foreignKey: 'UserID' });

db.Order.hasOne(db.Shipment, { foreignKey: 'OrderID' });
db.Shipment.belongsTo(db.Order, { foreignKey: 'OrderID' });

db.Order.hasMany(db.OrderDetail, { foreignKey: 'OrderID' });
db.OrderDetail.belongsTo(db.Order, { foreignKey: 'OrderID' });

db.Book.hasMany(db.OrderDetail, { foreignKey: 'BookID' });
db.OrderDetail.belongsTo(db.Book, { foreignKey: 'BookID' });

db.Seller.hasMany(db.OrderDetail, { foreignKey: 'UserID' });
db.OrderDetail.belongsTo(db.Seller, { foreignKey: 'UserID' });

db.Shipment.hasMany(db.OrderDetail, { foreignKey: 'ShipmentID' });
db.OrderDetail.belongsTo(db.Shipment, { foreignKey: 'ShipmentID' });

db.User.hasMany(db.BookReview, { foreignKey: 'UserID' });
db.BookReview.belongsTo(db.User, { foreignKey: 'UserID' });

db.Book.hasMany(db.BookReview, { foreignKey: 'BookID' });
db.BookReview.belongsTo(db.Book, { foreignKey: 'BookID' });

db.User.hasMany(db.SellerReview, { foreignKey: 'UserID' });
db.SellerReview.belongsTo(db.User, { foreignKey: 'UserID' });

db.Seller.hasMany(db.SellerReview, { foreignKey: 'SellerID' });
db.SellerReview.belongsTo(db.Seller, { foreignKey: 'SellerID' });

db.User.hasOne(db.ShoppingCart, { foreignKey: 'UserID' });
db.ShoppingCart.belongsTo(db.User, { foreignKey: 'UserID' });

db.Book.hasMany(db.Discount, { foreignKey: 'BookID' });
db.Discount.belongsTo(db.Book, { foreignKey: 'BookID' });

export default db;