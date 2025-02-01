type CategoryProps = {
  category: string;
};

const OrderPage = async ({ params }: { params: Promise<CategoryProps> }) => {
  const { category } = await params;
  console.log("el params", category);
  return <div>OrderPage</div>;
};

export default OrderPage;
