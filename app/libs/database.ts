import mongoose from "mongoose";
const Url = "mongodb+srv://monikahr:Ak7814478429@cluster0.qkqfmsl.mongodb.net/career?retryWrites=true&w=majority&appName=Cluster0";

const Connect = async()=>{
    try{
        await mongoose.connect(Url)
    }catch(err){
        console.log(err)
    }
}
export default Connect;