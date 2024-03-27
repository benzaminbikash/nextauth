import mongoose from "mongoose";

const DataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Database connection successfully!");
  } catch (error) {
    console.log(error);
  }
};

export default DataBase;
