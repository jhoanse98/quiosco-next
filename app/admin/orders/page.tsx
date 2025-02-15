import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

const getPendingOrders = async () => {
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
  return orders;
};

const page = async () => {
  const orders = await getPendingOrders();
  console.log("las orders", orders);
  return (
    <>
      <Heading>Administra ordenes</Heading>
      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay ordenes pendientes</p>
      )}
    </>
  );
};

export default page;
