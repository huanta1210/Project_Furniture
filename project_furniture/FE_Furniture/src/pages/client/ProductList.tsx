import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../store/contexts/ProductContext";
import SlideShow from "../../components/SlideShow";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import FilterCategory from "../../components/FilterCategory";
import { CategoriesContext } from "../../store/contexts/CategoriesContext";
import { CartContext } from "../../store/contexts/CartContext";

const ProductList = () => {
  const { state } = useContext(ProductContext);
  const { category, filterProductsByCategory } = useContext(CategoriesContext);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    if (category.selectedCategory) {
      filterProductsByCategory(category.selectedCategory._id);
    }
  }, [category.selectedCategory, filterProductsByCategory]);

  const [currentPages, setCurrentPages] = useState(1);
  const productPage = 8;

  const indexLastPage = currentPages * productPage;
  const indexFirstPage = indexLastPage - productPage;

  const productNumber = state.products.slice(indexFirstPage, indexLastPage);

  const totalPages = Math.ceil(state.products.length / productPage);

  const pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPages > 1) {
      setCurrentPages(currentPages - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPages < totalPages) {
      setCurrentPages(currentPages + 1);
    }
  };

  return (
    <div>
      <Header />

      <main>
        <div className="banner h-4/5 relative">
          <SlideShow />
        </div>
        <FilterCategory />

        <div className="mt-7 mx-44">
          <div className="flex flex-wrap gap-4 justify-between">
            {productNumber.map((product) => (
              <div
                key={product._id}
                className="product w-56 bg-gray-50 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]"
              >
                <Link to={`/details/${product._id}`}>
                  <img
                    className="h-64 w-full"
                    src={product.imageProduct}
                    alt=""
                  />
                </Link>
                <p className="title ml-2 font-semibold">
                  {product.productName}
                </p>
                <p className="description ml-2 text-sm py-1 text-gray-400 ">
                  {product.description?.slice(0, 19)}
                </p>
                <p className="price text-lg text-red-500 font-semibold py-2 ml-2">
                  {`${product.price} $`}
                </p>

                <div>
                  <button
                    className="border border-black rounded py-2 px-4 ml-3 bg-white hover:text-black hover:bg-black transition-all duration-1000
                   hover:bg-black mr-3"
                  >
                    <i className="fa-regular fa-heart text-black hover:text-white"></i>
                  </button>
                  <button
                    onClick={() =>
                      addToCart({
                        product: {
                          _id: product._id,
                          productName: product.productName,
                          price: product.price,
                          description: product.description,
                          stock: product.stock,
                          imageProduct: product.imageProduct,
                          categoriesId: product.categoriesId,
                        },
                        quantity: 1,
                      })
                    }
                    className="mb-2 border border-black font-semibold bg-white rounded text-black py-2 px-10 ml-2 whitespace-nowrap hover:bg-black transition-all duration-1000 hover:text-white "
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex my-4">
            <button onClick={handlePreviousPage}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            {pageNumbers.map((page) => (
              <div key={page} className="p-2">
                <button
                  type="button"
                  className={`px-2 py-1 rounded border font-semibold text-sm ${
                    page === currentPages - 1 ? "active-bg-button" : ""
                  }`}
                >
                  {page + 1}
                </button>
              </div>
            ))}
            <button onClick={handleNextPage}>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
