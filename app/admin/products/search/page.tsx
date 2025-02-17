import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search } = await searchParams;
  const products = await searchProducts(search!);
  console.log("el response", products);
  return (
    <>
      <Heading>Resultados de búsqueda: {search}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>
      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
};

export default SearchPage;
