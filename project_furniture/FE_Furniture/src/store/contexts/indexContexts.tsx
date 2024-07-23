import { ReactNode } from "react";
import { ProductProvider } from "./productContext";
import { CategoriesProvider } from "./categoriesContext";

type Children = {
  children: ReactNode;
};
const IndexContexts = ({ children }: Children) => {
  return (
    <ProductProvider>
      <CategoriesProvider>{children}</CategoriesProvider>
    </ProductProvider>
  );
};

export default IndexContexts;
