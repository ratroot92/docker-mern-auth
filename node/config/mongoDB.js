var mongoose = require("mongoose");

const connectDB = async () => {
    try{
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log(`MongoDB Conencted : ${connection.connection.host} `);
}
catch(err){
    throw err
}
};

module.exports = connectDB;


