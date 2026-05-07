const express = require('express');
const mongoose = require('mongoose');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/product-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");

// create database connection -> we can also craete a separate file for this and import it here
mongoose.connect("mongodb://mohamedsaabith1010_db_user:saabith123@ac-rohld23-shard-00-00.62mtyzw.mongodb.net:27017,ac-rohld23-shard-00-01.62mtyzw.mongodb.net:27017,ac-rohld23-shard-00-02.62mtyzw.mongodb.net:27017/?ssl=true&replicaSet=atlas-zq6pcn-shard-0&authSource=admin&appName=Cluster1").
then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type", 
            "Authorization",
            "cache-control",
            "Expires",
            "Pragma"],
        credentials: true,
    })
);

console.log("authRouter:", authRouter);

app.use(cookiesParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 