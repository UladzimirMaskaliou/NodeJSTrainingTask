import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true }, (err) => {
  if (err) throw new Error(err);
  console.log("Connection to MongoDB is successfull")
});

export default mongoose.connection;
export {mongoose};