import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import { TodoModel } from "@/lib/config/models/TodoModel";
const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") as string;
  try {
    const todos = await TodoModel.find({}).limit(parseInt(limit));
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

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("mongoId") as string;
  if (!id) {
    return NextResponse.json("cannot find todo id");
  }
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "todo deleted", deletedTodo });
  } catch (err) {
    console.log(err);
  }
}
