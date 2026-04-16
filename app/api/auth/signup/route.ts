import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, firstName, lastName, phone } = body;

        // Validate required fields
        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const [newUser] = await db
            .insert(users)
            .values({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone: phone || null,
            })
            .returning({
                id: users.id,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
            });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: newUser,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
