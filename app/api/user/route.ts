import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password, product } = body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create the product if provided
    if (product) {
      const { name: productName, price } = product;

      // Validate product data
      if (!productName || price == null) {
        return NextResponse.json({ message: 'Invalid product data' }, { status: 400 });
      }

      await db.product.create({
        data: {
          name: productName,
          price,
          user: { connect: { id: newUser.id } },
        },
      });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ user: userWithoutPassword, message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// GET API

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const includeProducts = url.searchParams.get('includeProducts') === 'true';
    const users = await db.user.findMany({
      include: {
        product: includeProducts,
      },
    });

    return NextResponse.json({ users, success: true });

  } catch (error) {
    console.error('Error retrieving users:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

