import { ProductProvider } from "./ProductContext";
import { CategoriesProvider } from "./CategoriesContext";
import { UserProvider } from "./UserContext";
import { ChildrenProps } from "../../interfaces/Children";
import { PageProvider } from "./PageContext";

const IndexContexts = ({ children }: ChildrenProps) => {
  return (
    <PageProvider>
      <UserProvider>
        <ProductProvider>
          <CategoriesProvider>{children}</CategoriesProvider>
        </ProductProvider>
      </UserProvider>
    </PageProvider>
  );
};

export default IndexContexts;
