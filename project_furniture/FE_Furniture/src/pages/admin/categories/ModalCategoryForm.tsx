import { useForm } from "react-hook-form";
import { Categories } from "../../../interfaces/Categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../../validators/category";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { CategoriesContext } from "../../../store/contexts/categoriesContext";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryUpdate: Categories | undefined;
};
const ModalCategoryForm = ({
  showModal,
  setShowModal,
  categoryUpdate,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Categories>({ resolver: zodResolver(categorySchema) });
  const { createCategory, updateCategory } = useContext(CategoriesContext);

  useEffect(() => {
    if (categoryUpdate) {
      setValue("categoryName", categoryUpdate.categoryName);
      setValue("slug", categoryUpdate.slug);
    } else {
      reset({
        categoryName: "",
        slug: "",
      });
    }
  }, [setValue, reset, categoryUpdate]);

  const onSubmit = async (data: Categories) => {
    try {
      if (categoryUpdate) {
        updateCategory(categoryUpdate._id, data);
      } else {
        createCategory(data);
      }
      setShowModal(false);
    } catch (error) {
      console.log(error);
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
                    {categoryUpdate ? "Update category" : "Create category"}
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
                      Category Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="text"
                      {...register("categoryName", {
                        required: true,
                      })}
                    />
                    {errors.categoryName && (
                      <small className="text-red-500">
                        {errors.categoryName.message}
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
                      {...register("slug", {
                        required: true,
                      })}
                    />
                    {errors.slug && (
                      <small className="text-red-500">
                        {errors.slug.message}
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
                      {categoryUpdate ? "Update category" : "Create category"}
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

export default ModalCategoryForm;
