import Connect from "@/app/libs/database";
import { leadModelData } from "@/app/libs/schemaModel/leadModel";
import { NextResponse } from 'next/server'
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: Request) {
    try {
        await Connect()
        const body = await req.json();
        const {name, contact, email,productA,productB,productC } = body;
        const Popup = new leadModelData({
            name, contact, email,productA,productB,productC
          });

       const result  = await Popup.save();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

//GET API

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser || (currentUser.role !== 'USER')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}
 
    let data:any = [];
    let success = true;
    try{
      await Connect();
   data = await leadModelData.find();
    } catch(err){
      data ={err}
      success = false
    }
    return NextResponse.json({data, success})}
