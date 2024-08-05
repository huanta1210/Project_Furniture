import { useForm } from "react-hook-form";

import { Product } from "../../../interfaces/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import instance from "../../../api";
import { useContext, useEffect, useState } from "react";
import mongoose from "mongoose";
import { CategoriesContext } from "../../../store/contexts/CategoriesContext";
import { ProductContext } from "../../../store/contexts/ProductContext";
import { productSchema } from "../../../validators/product";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentProduct: Product | undefined;
}

const ModalAdd: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  currentProduct,
}) => {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const { category } = useContext(CategoriesContext);
  const { createProduct, updateProduct } = useContext(ProductContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (currentProduct) {
      setValue("productName", currentProduct.productName);
      setValue("price", currentProduct.price);
      setValue("description", currentProduct.description);
      setValue("stock", currentProduct.stock);
      setValue("imageProduct", currentProduct.imageProduct);
      setValue("categoriesId", currentProduct.categoriesId || "");
    } else {
      reset({
        productName: "",
        price: null,
        description: "",
        stock: null,
        imageProduct: "",
        categoriesId: "",
      });
    }
  }, [currentProduct, setValue, reset]);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await instance.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.datas[0].url;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
      return null;
    }
  };

  const onSubmit = async (data: Product) => {
    console.log(data);
    try {
      if (!mongoose.Types.ObjectId.isValid(data.categoriesId)) {
        throw new Error("Invalid categoriesId format");
      }
      const categoriesIdObjectId = new mongoose.Types.ObjectId(
        data.categoriesId
      );
      // Upload image
      let uploadedImageUrl = "";
      if (data.imageProduct) {
        uploadedImageUrl = await uploadImageToCloudinary(data.imageProduct[0]);
        if (uploadedImageUrl) {
          setUploadedImageUrls([...uploadedImageUrls, uploadedImageUrl]);
          data.imageProduct = uploadedImageUrl;
          setValue("imageProduct", uploadedImageUrl);
        }
      }

      const productData = {
        ...data,
        categoriesId: categoriesIdObjectId.toHexString(),
      };

      // Call api to create and update product
      if (currentProduct) {
        updateProduct(currentProduct._id, productData);
      } else {
        createProduct(productData);
      }
      reset();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Error API");
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto w-full max-w-3xl my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-bold">
                    {currentProduct ? "Update Product" : "Add product"}
                  </h3>
                  <button
                    className="btn-x p-1 ml-auto bg-transparent border-0 text-slate-900 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="icon-x bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none ">
                      <i className="fa-solid fa-x text-xl"></i>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  action=""
                  className="bg-white rounded px-12 pt-4 pb-3 mb-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="text"
                      {...register("productName", {
                        required: true,
                      })}
                    />
                    {errors.productName && (
                      <small className="text-red-500">
                        {errors.productName.message}
                      </small>
                    )}
                  </div>

                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price: <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    {errors.price && (
                      <small className="text-red-500">
                        {errors.price.message}
                      </small>
                    )}
                  </div>

                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description: <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      {...register("description", {
                        required: true,
                      })}
                    />
                    {errors.description && (
                      <small className="text-red-500">
                        {errors.description.message}
                      </small>
                    )}
                  </div>

                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Stock: <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      {...register("stock", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    {errors.stock && (
                      <small className="text-red-500">
                        {errors.stock.message}
                      </small>
                    )}
                  </div>

                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Image: <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="appearance-none rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="file"
                      {...register("imageProduct", {
                        required: true,
                      })}
                    />
                    {errors.imageProduct && (
                      <small className="text-red-500">
                        {errors.imageProduct.message}
                      </small>
                    )}
                    {currentProduct?.imageProduct && (
                      <img
                        src={currentProduct.imageProduct}
                        alt={currentProduct.productName}
                        className="mt-2 size-20 h-auto"
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Categories: <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("categoriesId", { required: true })}
                    >
                      {category.categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    {errors.categoriesId && (
                      <small className="text-red-500">
                        {errors.categoriesId.message}
                      </small>
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-between py-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      {currentProduct ? "Update Product" : "Create product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalAdd;
