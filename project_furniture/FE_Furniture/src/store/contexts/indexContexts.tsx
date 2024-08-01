import { ReactNode } from "react";
import { ProductProvider } from "./ProductContext";
import { CategoriesProvider } from "./CategoriesContext";
import { UserProvider } from "./UserContext";

type Children = {
  children: ReactNode;
};
const IndexContexts = ({ children }: Children) => {
  return (
    <UserProvider>
      <ProductProvider>
        <CategoriesProvider>{children}</CategoriesProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default IndexContexts;
