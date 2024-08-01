import { createContext, useEffect, useReducer } from "react";
import { Product } from "../../interfaces/Product";
import instance from "../../api";
import { toast } from "react-toastify";
import productReducer from "../reducers/productReducer";
import { ChildrenProps } from "../../interfaces/Children";

type ProductContext = {
  state: {
    products: Product[];
  };
  handleDelete: (id: string | number) => void;
  createProduct: (data: Product) => void;
  updateProduct: (id: string | number, data: Product) => void;
};

export const ProductContext = createContext<ProductContext>(
  {} as ProductContext
);

export const ProductProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const handleDelete = async (id: string | number) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete");

      if (confirmDelete) {
        const res = await instance.delete(`/product/delete-product/${id}`);
        if (!res) {
          toast.error("Get data product deleted unsuccessful");
        }
        toast.success("Product deleted successfully");
        dispatch({ type: "DELETE_PRODUCTS", payload: id });
      }
    } catch (error) {
      toast.error("Error API: " + error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get("/product");
        if (!res) {
          toast.error("Get product failed");
        }
        dispatch({ type: "SET_PRODUCTS", payload: res.data.datas });
      } catch (error) {
        toast.error("Error getting product");
      }
    })();
  }, []);

  const createProduct = async (data: Product) => {
    try {
      const res = await instance.post("/product/create-product", data);

      if (!res) {
        toast.error("Create product not found");
      }
      dispatch({ type: "CREATE_PRODUCTS", payload: res.data.datas });
      toast.success("Create product is successful", {
        autoClose: 500,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };

  const updateProduct = async (id: string | number, data: Product) => {
    try {
      const res = await instance.put(`/product/edit-product/${id}`, data);

      if (!res) {
        toast.error("Update product not found");
      }
      dispatch({ type: "UPDATE_PRODUCTS", payload: res.data.datas });
      toast.success("Update product is successful", {
        autoClose: 500,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error updatting product");
    }
  };

  return (
    <ProductContext.Provider
      value={{ state, handleDelete, createProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
