import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Categories } from "../../interfaces/Categories";
import categoriesReducer from "../reducers/categoriesReducer";
import instance from "../../api";
import { toast } from "react-toastify";

type CategoriesContext = {
  state: {
    categories: Categories[];
  };
};
type ChildrenProps = {
  children: ReactNode;
};

export const CategoriesContext = createContext<CategoriesContext>(
  {} as CategoriesContext
);

export const CategoriesProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(categoriesReducer, { categories: [] });

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

  return (
    <CategoriesContext.Provider value={{ state }}>
      {children}
    </CategoriesContext.Provider>
  );
};
