import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SignUpAPISchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📥 [signup] Full request body:", JSON.stringify(body, null, 2))

    // Validate the request body
    const validationResult = SignUpAPISchema.safeParse(body);

    if (!validationResult.success) {
      console.log("❌ [signup] Validation failed!");
      validationResult.error.issues.forEach(issue => {
        console.log(`  - ${issue.path.join('.')}: ${issue.message}`)
      })
      return NextResponse.json(
        { 
          error: "Validation failed", 
          issues: validationResult.error.issues,
          received: body
        },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ [signup] User already exists:", email)
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    console.log("✅ [signup] User created successfully:", email)

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ [signup] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
