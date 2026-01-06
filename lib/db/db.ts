import mongoose from "mongoose";

type ConnectionObject ={
  isConnected?: number;
}

const connection : ConnectionObject ={}

export async function connectDB(): Promise<void> {
  if(connection.isConnected){
    console.log("ALREADY CONNECTED TO DATABASE");
  return;
}  
 try {
  const db = await mongoose.connect(process.env.MONGO_URI!)
 
 connection.isConnected = db.connections[0].readyState;

 console.log("MONGODB CONNECTED");
   
 } catch (error) {
  console.log("MONGODB CONNECTION ERROR", error);
  process.exit(1);
 }
}