
import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";

//  PUT API
export async function PUT(request:any,content:any) {
    try {
        const id = content.params.id;
        const payload =  await request.json()
const products = await db.product.update({
    where:{id},data:payload
});
return NextResponse.json({products,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}

// Single GET API
export async function GET(request:any,content:any) {
    try {
        const id = content.params.id;
const products = await db.product.findUnique({
    where:{id}
});
return NextResponse.json({products,success:true})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}

//  DELETE API
export async function DELETE(request:any,content:any) {
    try {
        const id = content.params.id;
const products = await db.product.delete({
    where:{id}
});
return NextResponse.json({products,success:true})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}