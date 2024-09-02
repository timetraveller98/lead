import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, userId } = body;

        // Validate input
        if (!userId) {
            return NextResponse.json({ message: 'Please login first' }, { status: 400 });
        }

        // Check if the user exists
        const existingUser = await db.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Create the product
        const newProduct = await db.product.create({
            data: {
                name,
                price,
                user: { connect: { id: userId } },
            },
        });

        return NextResponse.json({ product: newProduct, message: 'Product created successfully' }, { status: 201 });

    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

// GET API

export async function GET() {
    try {
        const products = await db.product.findMany({
            include: {
                user: true,
            },
        });

        return NextResponse.json({ products, success: true });

    } catch (error) {
        console.error('Error retrieving products:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
