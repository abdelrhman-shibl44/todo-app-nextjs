import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import { TodoModel } from "@/lib/config/models/TodoModel";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const createdByUserId = session?.user?.id;
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") as string;

  try {
    const todos = await TodoModel.find({
      createdBy: createdByUserId,
    })
      .limit(parseInt(limit) || 5)
      .populate("createdBy");
    const AllTodosLoaded = todos.length < parseInt(limit);
    return NextResponse.json({ todos, AllTodosLoaded });
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }
  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json("All fields are required");
  }
  try {
    const createdByUserId = session?.user?.id;
    const createdTodo = await TodoModel.create({
      title,
      description,
      createdBy: createdByUserId,
    });

    return NextResponse.json({ msg: "todo created", createdTodo });
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("mongoId") as string;
  if (!id) {
    return NextResponse.json("cannot find todo id");
  }
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isCompleted: true,
        },
      },
      { new: true }
    );

    return NextResponse.json({ msg: "todo updated", updatedTodo });
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

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
