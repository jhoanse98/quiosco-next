import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

type CategoryIconProps = {
  category: Category;
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
  return (
    <div
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt="Imagen Categoria"
          width={64}
          height={64}
        />
      </div>

      <Link className="text-xl font-bold" href={`/order/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryIcon;
