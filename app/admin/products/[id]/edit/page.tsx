import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import GoBackButton from "@/components/ui/GoBackButton";

const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
};

const EditProductsPage = async ({ params }: { params: { id: string } }) => {
  const response = await params;
  const product = await getProductById(+response.id);
  console.log("el product desde edit", product);
  return (
    <>
      <Heading>Editar producto</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default EditProductsPage;
