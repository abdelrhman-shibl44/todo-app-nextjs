import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/config/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/mailer";

const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new NextResponse("All fields are required");
    }
    // check if user exists
    const User = await UserModel.findOne({ email });
    if (User) {
      return new NextResponse("User already exists", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 11);
    const savedUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    //send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Send success reponse
    return NextResponse.json({
      message: "User created successfully",
      status: 200,
      savedUser,
    });
  } catch (err: any) {
    console.log("while register " + err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
