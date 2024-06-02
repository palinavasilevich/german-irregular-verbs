import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getLocalData } from "@/utils/getLocalData";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const data = getLocalData();
//     console.log("getLocalData()", data);
//     res.status(200).json(data);
//   } else {
//     res.status(405).end();
//   }
// }
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = getLocalData();

  return NextResponse.json(data, { status: 200 });
}
