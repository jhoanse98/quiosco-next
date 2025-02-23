import { prisma } from "@/src/lib/prisma";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
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