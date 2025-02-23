import { prisma } from "@/src/lib/prisma";

const dynamic = 'force-dynamic';

export async function GET() {
      const orders = await prisma.order.findMany({
        where: {
          status: false,
        },
        include: {
          OrderProducts: {
            include: {
              product: true,
            },
          },
        },
      });
      return Response.json(orders);
}