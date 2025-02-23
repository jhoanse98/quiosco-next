import { OrderWithProducts } from "@/src/types";

type LatestOrderItemProps = {
  order: OrderWithProducts;
};
const LatestOrderItem = ({ order }: LatestOrderItemProps) => {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}
      </p>
      <ul
        className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
        role="List"
      >
        {order.OrderProducts.map((product) => (
          <li key={product.id} className="flex py-6 text-lg">
            <span className="font-bold">{product.quantity}</span>
            <p>{product.product.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestOrderItem;
