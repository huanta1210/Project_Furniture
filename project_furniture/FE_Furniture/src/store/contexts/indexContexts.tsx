import { ProductProvider } from "./ProductContext";
import { CategoriesProvider } from "./CategoriesContext";
import { UserProvider } from "./UserContext";
import { ChildrenProps } from "../../interfaces/Children";
import { PageProvider } from "./PageContext";
import { CartProvider } from "./CartContext";

const IndexContexts = ({ children }: ChildrenProps) => {
  return (
    <CartProvider>
      <PageProvider>
        <UserProvider>
          <ProductProvider>
            <CategoriesProvider>{children}</CategoriesProvider>
          </ProductProvider>
        </UserProvider>
      </PageProvider>
    </CartProvider>
  );
};

export default IndexContexts;
