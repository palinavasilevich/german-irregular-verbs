import { getLocalData } from "@/utils/getLocalData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { verbs } = await getLocalData();
    return NextResponse.json(verbs, { status: 200 });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
