"use client";
import { getImagePath } from "@/src/utils";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  image?: string | undefined;
};

const ImageUpload = ({ image }: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <CldUploadWidget
      uploadPreset="zabstn7o"
      options={{ maxFiles: 1 }}
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        // @ts-expect-error type cloudinary
        setImageUrl(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p>Agregar Imagen</p>
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl}
                    alt="Imagen de Producto"
                  />
                </div>
              )}
            </div>
          </div>
          {image && !imageUrl && (
            <div className="space-y-2">
              <label>Imagen actual:</label>
              <div className="relative w-64 h-64">
                <Image fill src={getImagePath(image)} alt="Imagen Producto" />
              </div>
            </div>
          )}
          <input
            type="hidden"
            name="image"
            defaultValue={imageUrl ? imageUrl : image}
          />
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
