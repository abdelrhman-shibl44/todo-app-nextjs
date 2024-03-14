import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import { TodoModel } from "@/lib/config/models/TodoModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const createdByUserId = session?.user?.id;

  if (!session) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") as string;
  const limit = (searchParams.get("limit") as string) || "5";
  try {
    const regex = new RegExp(query, "i");
    const todos = await TodoModel.find({
      $and: [
        { $or: [{ title: regex }, { description: regex }] },
        { createdBy: createdByUserId },
      ],
    }).limit(parseInt(limit));
    const AllTodosLoaded = todos.length < parseInt(limit);
    return NextResponse.json({ todos, AllTodosLoaded });
  } catch (err) {
    console.log(err);
  }
}
