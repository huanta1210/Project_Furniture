import { ProductProvider } from "./ProductContext";
import { CategoriesProvider } from "./CategoriesContext";
import { UserProvider } from "./UserContext";
import { ChildrenProps } from "../../interfaces/Children";
import { PageProvider } from "./PageContext";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext";

const IndexContexts = ({ children }: ChildrenProps) => {
  return (
    <LocationProvider>
      <AuthProvider>
        <CartProvider>
          <PageProvider>
            <UserProvider>
              <ProductProvider>
                <CategoriesProvider>{children}</CategoriesProvider>
              </ProductProvider>
            </UserProvider>
          </PageProvider>
        </CartProvider>
      </AuthProvider>
    </LocationProvider>
  );
};

export default IndexContexts;
