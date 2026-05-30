const mongoose = require('mongoose');

const MONGO_URI = "mongodb://ashiksiddike:r8DnLuGYqpTeF4lD@cluster0-shard-00-00.zufju.mongodb.net:27017,cluster0-shard-00-01.zufju.mongodb.net:27017,cluster0-shard-00-02.zufju.mongodb.net:27017/portfolio_db?tls=true&replicaSet=atlas-og80z2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

console.log("Connecting to MongoDB Atlas...");
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILED to connect to MongoDB Atlas:", err);
    process.exit(1);
  });
