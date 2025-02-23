import { prisma } from "@/src/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dynamic = "force-dynamic";

export async function GET() {
  const ordersReady = await prisma.order.findMany({
    take: 5,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return Response.json(ordersReady);
}
