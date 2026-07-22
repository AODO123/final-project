require("dotenv").config();
const connectDB = require("./DB/connect");
const Product = require("./models/product");
const Cart = require("./models/cart");

//sample products for demo
const seedProducts = async () => {
  const products = [
    {
      name: "Laptop",
      price: 999,
      description: "Light laptop",
      category: "electronics",
      image: "https://i.pinimg.com/736x/db/81/62/db8162ce6df91b1f126a9e02ab9bb86d.jpg",
      stock: 9,
    },
    {
      name: "Wireless Mouse",
      price: 50,
      description: "Mouse with long battery life",
      category: "electronics",
      image: "https://i.pinimg.com/1200x/0f/a0/04/0fa0046d0dbc0ac2978dd3ab5d5626e1.jpg",
      stock: 2,
    },
  ];

  const connected = await connectDB();
  if (!connected) {
    console.error(
      "Please start MongoDB and set MONGO_URI.",
    );
    process.exit(1);
  }

  await Product.deleteMany();
  await Cart.deleteMany();
  await Product.insertMany(products);
  await Cart.create({ items: [], totalAmount: 0 });
  console.log("data inserted into MongoDB");
  process.exit(0);
};

seedProducts().catch((err) => {
  console.error(err);
  process.exit(1);
});
