import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import authorRoutes from "./routes/authorsRoutes.js";

//của Minh
import genresRoutes from "./routes/genresRoutes.js";
import shoppingCartRoutes from "./routes/shoppingcartRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import orderDetailRoutes from "./routes/orderdetailRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import discountRoutes from "./routes/discountsRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import registerRoutes from './routes/registerRoutes.js';



import {sql} from "./config/db.js";

// import {aj} from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// //apply arcjet
// app.use(async(req, res, next) => {
//     try {
//         const decision = await aj.protect(req, {
//             request: 1
//         })

//         if (decision.isDenied()) {
//             if (decision.reason.isRateLimit()) {
//                 res.status(429).json({error: "Too many requests, please try again later"});
//             } else if (decision.reason.isBot()) {
//                 res.status(403).json({error: "Bot access denied"});
//             } else {
//                 res.status(403).json({error: "Forbidden"});
//             }

//             return;
//         }

//         //check for spoofed bot
//         if (decision.results.some((results) => results.reason.isBot() && results.reason.isSpoofed())) {
//             res.status(403).json({error: "Spoofed bot detected"});
//             return;
//         }

//         next();
//     } catch (error) {
//         console.log("Arcjet error", error);
//         next(error);
//     }
// })

app.use("/api/products", productRoutes);
app.use("/api/authors", authorRoutes);

//của Minh
app.use("/api/genres", genresRoutes);
app.use("/api/shoppingcart", shoppingCartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderdetail", orderDetailRoutes);
app.use("/api/shipment", shipmentRoutes);   
app.use("/api/discounts", discountRoutes);
app.use("/api/login", loginRoutes);
app.use('/api/register', registerRoutes);

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS Authors (
                AuthorID SERIAL PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                Nationality VARCHAR(100)
            )
        `;

        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initDB", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    })
})
