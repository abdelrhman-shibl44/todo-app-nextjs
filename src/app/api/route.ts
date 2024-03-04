import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import { TodoModel } from "@/lib/config/models/TodoModel";
const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();

export async function GET() {
  try {
    const todos = await TodoModel.find({});
    return NextResponse.json(todos);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json("All fields are required");
  }
  try {
    const createdTodo = await TodoModel.create({
      title,
      description,
    });

    return NextResponse.json({ msg: "todo created", createdTodo });
  } catch (err) {
    console.log(err);
  }
}
