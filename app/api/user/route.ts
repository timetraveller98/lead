import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt'

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {email, name, password} = body;

        const existingEmail  = await db.user.findUnique({
            where:{email}
        });
        if(existingEmail){
            return NextResponse.json({user:null,message:'Email Already Exists'},{status:409})
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data:{
                name,
                email,
               password: hashedPassword
            }
        }) 
        const {password: newUserPassword, ...rest} = newUser;
        return NextResponse.json({user:rest,message:'user created successfully'},{status:201})

    } catch (error) {

       return NextResponse.json({message:'something went wrong'},{status:500})
         
    }
    
}