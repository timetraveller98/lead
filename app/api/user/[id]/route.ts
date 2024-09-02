
import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";

//  PUT API
export async function PUT(request:any,content:any) {
    try {
        const id = content.params.id;
        const payload =  await request.json()
const user = await db.user.update({
    where:{id},data:payload
});
return NextResponse.json({user,success:true})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}

// Single GET API
export async function GET(request:any,content:any) {
    try {
        const id = content.params.id;
const user = await db.user.findUnique({
    where:{id}
});
return NextResponse.json({user,success:true})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}

//  DELETE API
export async function DELETE(request:any,content:any) {
    try {
        const id = content.params.id;
const user = await db.user.delete({
    where:{id}
});
return NextResponse.json({user,success:true})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}