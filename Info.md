# Para correr el proyecto
npm run dev
# Para correr el entorno de prisma
npx prisma studio


Routing dinamico en Next:
Muchas veces se quiere acceder a un recurso en la base de datos por su ID o slug, ya sea para ver detalles de un producto o leer una entrada de blog o datos de un cliente.
En App Router la forma en la que generas el Routing dinámico es con una carpeta y un nombre entre corchetes, ejemplo:
[id], [slug], [paymentId], etc.

ejemplo:
#
# const OrderPage = async ({ params }: { params: Promise<CategoryProps> }) => {
#  const { category } = await params;
# }
#

NOTA: la propiedad "params" no está disponible para cualquier componente de NEXT excepto estos:
layout.tsx
page.tsx
route.tsx
generateMetadata

Para obtener la información que viene de la URL usamos useParams de next/navigation (solo funciona en componentes de cliente)


# Zustand section

npm i zustand
1. Creamos el store

import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
}

# export const useStore = create<Store>((set) => ({
#    order: [],
#    addToOrder: (product) => {
#        // eslint-disable-next-line @typescript-eslint/no-unused-vars
#        const { categoryId, image, ...data } = product
#        console.log(data)
#        set((state) => ({
#            order: [...state.order, {
#                ...data,
#                quantity: 1,
#                subtotal: 1 * product.price
#           }]
#       }))
#    }
# }))


# Modificaciones en los schemas de prisma y generar las migraciones:
npx prisma migrate dev


# ¿Qué son los server actions?

En Next.js Los server actions son funciones asíncronas que se ejecutan en el servidor, se pueden utilizar con clientes de Componente y servidor.
Se utilizan para crear datos o mutarlos y están muy unidos al CRUD.
Utilizan la directiva "use server" que en el caso de Componentes de Servidor debe ser la primer línea de la función, mientras que en Client Componentes se deben importar de otro archivo que en la parte superior debe tener esta directiva
#       #Importante
            Los server actions deben estar dentro del atributo action = {} de un <form>
            También pueden ser llamadoos dentro de un useEffect o al presionar un botón
            No son exclusivos de Next.js ya que React en la versión 19 los va a tener incorporados

- Lo recomendable para los actions es crear una carpeta aparte


# REVALIDACION DE DATA

Existen dos formas de revalidaciones en Nextjs:
1. Revalidación basada en el tiempo
2. Revalidación basada en ciertos eventos

# Cuando requerimos obtener información de la URL como por ejemplo ?page=1 usamos {searchParams} como parametro en los componentes de page y layout

# COMPOSICIÓN: En next cuando usamos "use client" todo el componente junto con sus hijos se tornan componentes de cliente (se ejecutan en el navegador)
# pero tenemos este caso en particular:
# "use client";
# import ProductForm from "./ProductForm";

# const AddProductForm = () => {
#  const handleSubmit = async (formData: FormData) => {
#    console.log("desde handlesubmit");
#  };
#  return (
#    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
#      <form className="space-y-5" action={handleSubmit}>
#        <ProductForm /> #PRODUCTFORM ES UN COMPONENTE QUE DEBE SEGUIR SIENDO COMPONENTE DE SERVIDOR
#        <input
#          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor pointer"
#          type="submit"
#          value={"Registrar producto"}
#        />
#      </form>
#    </div>
#  );
# };
 PARA EL CASO EN EL CUAL PRODUCT FORM SIGA SIENDO COMPONENTE DE SERVIDOR Y NO PASE A SER UN COMPONENTE DE CLIENTE SE USA LA COMPOSICIÓN QUE CONSISTE EN PASAR PRODUCTFORM COMO UN CHILDREN AL COMPONENTE AddProductFORM

# const AddProductForm = ({ children }: { children: React.ReactNode }) => {
#    const handleSubmit = async (formData: FormData) => {
#        console.log("desde handlesubmit");
#    };
#    return (
#      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
#        <form className="space-y-5" action={handleSubmit}>
#            {children} AQUI VIENE PRODUCTFORM PERO YA COMO HIJO
#           <input
#             className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor pointer"
#             type="submit"
#             value={"Registrar producto"}
#           />
#       </form>
#     </div>
#    );
# };

En este caso al componente cliente AddProductForm se le pasa el componente ProductForm como un children 

# <AddProductForm>
#   <ProductForm />
# </AddProductForm>


Cuando vas a subir imagenes de cloudinary y las quieres mostrar en el componente de Image de next, le debes configurar el dominio de cloudinary en tus next configurations de lo contrario tu aplicación va a fallar debido a que ese dominio no está como parte de las configuraciones de imagenes de next:
EJ:

# const nextConfig: NextConfig = {
#  images: {
#    remotePatterns: [
#      {
#        protocol: 'https',
#        hostname: 'res.cloudinary.com'
#      }
#    ]
#  }
# };

# SWR

Es una herramiento para hacer fetching de data automatizado como un react query. Solo funciona en el cliente y requiere el endpoint de una API

En Next existe el formato de carpetas API (la cual te crea una ruta común y corriente) /orders/api y soporta todos los métodos HTTP para hacer uso de swr se instala con el siguiente comando

# npm i swr

#  const url = "/admin/orders/api";
#  const fetcher = () =>
#    fetch(url)
#      .then((res) => res.json())
#      .then((data) => data);
#  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
#    refreshInterval: 60000,
#    revalidateOnFocus: false,
#  });
