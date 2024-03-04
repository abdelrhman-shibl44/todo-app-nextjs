import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
const LoadDb = async () => {
  await ConnectDB();
};
LoadDb();

export async function GET() {
  try {
    return NextResponse.json("hi");
  } catch (err) {
    console.log(err);
  }
}
