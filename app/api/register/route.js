import DataBase from "@/config/db";
import { User } from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, password, cpassword } = await request.json();
  await DataBase();

  if (!name || !email || !password || !cpassword) {
    return NextResponse.json(
      {
        message: "All fields are required",
        success: false,
      },
      { status: 400 }
    );
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return NextResponse.json(
      {
        message: "Email Already Exits.",
        success: false,
      },
      { status: 400 }
    );
  }
  if (password !== cpassword) {
    return NextResponse.json(
      {
        message: "Password and Confirmation Password are not match.",
        success: false,
      },
      { status: 400 }
    );
  }
  const passwordBcrypt = await bcrypt.hash(password, 10);
  const user = new User({
    name: name,
    email: email,
    password: passwordBcrypt,
  });
  try {
    await user.save();
    return NextResponse.json(
      {
        message: "User Create successfully!",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
}
