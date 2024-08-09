import { getCabins } from "@/app/_lib/data-service";

export async function GET() {
  try {
    const cabins = await getCabins();
    return Response.json({ cabins });
  } catch (err) {
    return Response.json({
      message: "An error happened while fetching cabins",
    });
  }
}
