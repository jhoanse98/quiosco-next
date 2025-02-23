import { prisma } from "@/src/lib/prisma";
import { Product } from "@prisma/client";
import ImageUpload from "./ImageUpload";

type ProductFormType = {
  product?: Product;
};

const getCategory = async () => {
  return await prisma.category.findMany();
};

const ProductForm = async ({ product }: ProductFormType) => {
  console.log("el product", product);
  const categories = await getCategory();
  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ImageUpload image={product?.image} />
      </div>
    </>
  );
};

export default ProductForm;
