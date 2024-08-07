import { createContext, useEffect, useReducer } from "react";
import { Categories } from "../../interfaces/Categories";
import categoriesReducer from "../reducers/categoriesReducer";
import instance from "../../api";
import { toast } from "react-toastify";
import { ChildrenProps } from "../../interfaces/Children";
import { Product } from "../../interfaces/Product";

type CategoriesContext = {
  category: {
    categories: Categories[];
    selectedCategory?: Categories | null;
    products: Product[];
  };
  handleDelete: (id: string | number) => void;
  createCategory: (data: Categories) => void;
  updateCategory: (id: string | number, data: Categories) => void;
  getDetailCategory: (id: string | number) => void;
  filterProductsByCategory: (categoriesId: string | number) => void;
};

export const CategoriesContext = createContext<CategoriesContext>(
  {} as CategoriesContext
);

export const CategoriesProvider = ({ children }: ChildrenProps) => {
  const [category, dispatch] = useReducer(categoriesReducer, {
    categories: [],
    products: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get("/categories");

        if (!res) {
          toast.error("Category not found");
        }

        dispatch({ type: "SET_CATEGORIES", payload: res.data.datas });
      } catch (error) {
        toast.error("Error API");
      }
    })();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      const res = await instance.delete(`categories/delete-categories/${id}`);

      if (!res) {
        toast.error("Error deleting category");
      }
      toast.success("Category deleted", {
        autoClose: 500,
      });
      dispatch({ type: "DELETE_CATEGORIES", payload: id });
    } catch (error) {
      console.error("Error");
      toast.error("Error API");
    }
  };

  const createCategory = async (data: Categories) => {
    try {
      const res = await instance.post("categories/create-categories", data);
      console.log(res.data.datas);
      if (!res) {
        toast.error("Create categories unsuccessful");
      } else {
        dispatch({ type: "CREATE_CATEGORIES", payload: res.data.datas });
        toast.success("Categories created successfully", {
          autoClose: 300,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Api");
    }
  };
  const updateCategory = async (id: string | number, data: Categories) => {
    try {
      const res = await instance.put(
        `categories/update-categories/${id}`,
        data
      );
      if (!res) {
        toast.error("Update categories unsuccessful");
      } else {
        dispatch({ type: "UPDATE_CATEGORIES", payload: res.data.datas });
        toast.success("Categories updated successfully", {
          autoClose: 300,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Api");
    }
  };

  const getDetailCategory = async (id: string | number) => {
    try {
      const res = await instance.get(`categories/${id}`);
      if (!res) {
        toast.error("Update categories unsuccessful");
      } else {
        dispatch({ type: "GET_DETAIL_CATEGORY", payload: res.data.datas });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Api");
    }
  };

  const filterProductsByCategory = (categoriesId: string | number) => {
    console.log("Filter Products", categoriesId);
    dispatch({ type: "FILTER_CATEGORIES", payload: categoriesId });
  };

  return (
    <CategoriesContext.Provider
      value={{
        category,
        handleDelete,
        createCategory,
        updateCategory,
        getDetailCategory,
        filterProductsByCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
