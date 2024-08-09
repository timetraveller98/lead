import mongoose from "mongoose";
const Url = "mongodb+srv://school:student123@cluster0.64833pk.mongodb.net/lead?retryWrites=true&w=majority&appName=Cluster0";

const Connect = async()=>{
    try{
        await mongoose.connect(Url)
    }catch(err){
        console.log(err)
    }
}
export default Connect;