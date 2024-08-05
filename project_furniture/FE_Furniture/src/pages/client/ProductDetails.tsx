import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../store/contexts/ProductContext";
import { CategoriesContext } from "../../store/contexts/CategoriesContext";
import { CartContext } from "../../store/contexts/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { state, getDetails } = useContext(ProductContext);
  const { category, getDetailCategory } = useContext(CategoriesContext);
  const { addToCart } = useContext(CartContext);
  const idCategory = state.selectedProduct?.categoriesId;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (idCategory) getDetailCategory(idCategory);
  }, []);

  useEffect(() => {
    if (id) getDetails(id);
  }, []);

  const handleAddToCart = () => {
    if (state.selectedProduct) {
      addToCart({
        product: state.selectedProduct,
        quantity,
      });
    }
    navigate("/cart");
  };
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mb-10">
        <div className="mx-44 ">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-1 h-96">
              <div className="image mb-1">
                <img
                  className="h-16 w-full"
                  src={state.selectedProduct?.imageProduct}
                  alt=""
                />
              </div>
              <div className="image mb-1">
                <img
                  className="h-16 w-full"
                  src={state.selectedProduct?.imageProduct}
                  alt=""
                />
              </div>
              <div className="image mb-1">
                <img
                  className="h-16 w-full"
                  src={state.selectedProduct?.imageProduct}
                  alt=""
                />
              </div>
              <div className="image mb-1">
                <img
                  className="h-16 w-full"
                  src={state.selectedProduct?.imageProduct}
                  alt=""
                />
              </div>
              <div className="image mb-1">
                <img
                  className="h-16 w-full"
                  src={state.selectedProduct?.imageProduct}
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="img h-80 w-full">
                <img
                  className="h-96 w-full"
                  src={state.selectedProduct?.imageProduct}
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="title">
                <h3 className="text-xl font-semibold">
                  {state.selectedProduct?.productName}
                </h3>
              </div>
              <div className="mt-2">
                <p className="price text-3xl text-red-500 font-bold">
                  {state.selectedProduct?.price} $
                </p>
              </div>
              <div className="rating my-4">
                <div className="review inline-block border-r-2 border-gray-400">
                  <span className="star text-xl text-yellow-400">&#9733;</span>
                  <span className="star text-xl text-yellow-400 pl-1">
                    &#9733;
                  </span>
                  <span className="star text-xl text-yellow-400 pl-1">
                    &#9733;
                  </span>
                  <span className="star text-xl text-yellow-400 pl-1">
                    &#9733;
                  </span>
                  <span className="star text-xl text-yellow-400 pl-1 pr-4">
                    &#9733;
                  </span>
                </div>
                <div className="user-review inline-block ml-4">
                  <p className="text-sm text-gray-400 font-semibold">
                    5 Customer Review
                  </p>
                </div>
              </div>

              <div className="product-decription mb-4">
                <p className="text-sm font-semibold">
                  {state.selectedProduct?.description}
                </p>
              </div>
              <div
                key={state.selectedProduct?._id}
                className="pay mt-4 border-b-2 border-gray-300 mb-1"
              >
                <div className="flex justify-between mb-4">
                  <div className="count border rounded font-semibold border-gray-400">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      className="inline-block pl-2"
                    >
                      -
                    </button>
                    <p className="inline-block px-12 py-2">{quantity}</p>

                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="inline-block pr-2"
                    >
                      +
                    </button>
                  </div>
                  <div className="add-cart border rounded font-semibold border-amber-400">
                    <button
                      onClick={handleAddToCart}
                      className="py-2 px-14 text-amber-400 transition-all duration-1000 hover:text-white hover:bg-black"
                    >
                      Add to cart
                    </button>
                  </div>
                  <div className="compare border rounded font-semibold border-gray-400 ">
                    <button className="py-2 px-14">
                      <span className="pr-2">+</span> Compare
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs mb-1 font-semibold text-gray-300">
                  SKU: <span>{state.selectedProduct?._id}</span>
                </p>
                <p className="text-xs mb-1 font-semibold text-gray-300">
                  Category:{" "}
                  <span> {category.selectedCategory?.categoryName}</span>
                </p>
                <p className="text-xs mb-1 font-semibold text-gray-300">
                  Tags:{" "}
                  {category.categories.map((item, index) => (
                    <span key={item.categoryName}>
                      {item.categoryName}
                      {index < category.categories.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <div className="description mt-8 border-b-2 border-gray-300 pb-2">
            <div className="text-center text-sm font-semibold text-gray-400">
              <button>Description</button>
              <button className="px-20">Additional Infomation</button>
              <button>Reviews [ 5 ]</button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-400 leading-normal">
              Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
              portable active stereo speaker takes the unmistakable look and
              sound of Marshall, unplugs the chords, and takes the show on the
              road.{" "}
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced. The analogue knobs allow you to fine
                tune the controls to your personal preferences while the
                guitar-influenced leather strap enables easy and stylish travel.
              </p>
            </p>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <img
                  src="https://s3-alpha-sig.figma.com/img/4d26/0b19/5097c12f94c7d24479be52f8550f92f8?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CA1U9uMY6nRG6OtkqQc3rYmg6TNdRAxqdupXUnve9iTljdiZTBgO4ZmIYjTJRRuM1haF~DUMqHBL3u5KCWvTNvkNToDDtweL0LwPJHa-FYiEzruA-ljYPwjKnp4JqgCMwT-06MdPdGuEOM58Ma9OaBg57odSTScj2C5xoZUJu-Ou3~OWZx4Rt~dUOmi3BG27baMMR1TRfQkw3MpMd0fL5-z1ubhZS0LMAB2ivGZPsZq-f5TQ-3C9asqIEKYvsVVlu-YpKT2w2gY3HThLWrjUD-CPCcJ3q9rMQPXG26fGCv1Y1CTMUSdJ1AZ6ngpNbS89t1xbiFUXOLhb3pjoqdIlmw__"
                  alt=""
                />
              </div>
              <div className="col-span-6">
                <img
                  src="https://s3-alpha-sig.figma.com/img/1db4/6e73/69ea9e6d364518aa24f4bc45ef9ab45b?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aa5fBpmq9xsKoy9M1bNZqtRCIunc3-zfyInDCo1Rs3lqNMEZldrrM7rd8dgpYKy2yvdanoEr2tqC2iaGMu0BQxQqYXw2kbHWhM3mg1ic-uuwCIVVz9evLF82fnomGY32oM5~Dfa0qui~6vlnP740tx8wkQF7gJFtrLq6aax8l2Oht5FXGpdlpJPnXFiKE7WY7FWBaRTEghn4E0mpVbOFX84xIWQtJApNq3xN69kpiPMJYu-I476G8VoGDiVkF1WeOc3xf4GMfAOd5r5ka42GZNjieVAjGxASKp-VsrtXYrFJr~k8pEwFTTIXBZO3ECHKXKc4bum6wYLx-Frqz04Thw__"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="main-title text-center">
              <p className="text-3xl font-bold ">Related Products</p>
            </div>
            <div className="product mt-7">
              <div className="flex flex-wrap gap-4 justify-between">
                {state.products.slice(0, 4).map((product) => (
                  <div className="product w-56 bg-gray-50 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]">
                    <a href="">
                      <img
                        className="h-64 w-full"
                        src={product.imageProduct}
                        alt=""
                      />
                    </a>
                    <p className="title ml-2 font-semibold">
                      {product.productName}
                    </p>
                    <p className="description ml-2 text-gray-300 ">
                      {product.description?.slice(0, 19)}
                    </p>
                    <p className="price text-lg text-red-500 font-semibold ml-2 py-2">
                      {product.price}$
                    </p>
                    <div>
                      <button className="border border-black rounded py-2 px-4 ml-3 bg-white hover:bg-black transition-all duration-1000 mr-3">
                        <i className="fa-regular fa-heart hover:text-white"></i>
                      </button>
                      <Link to="/cart">
                        <button className="mb-2 border border-black font-semibold rounded py-2 px-10 transition-all duration-1000 ml-2 whitespace-nowrap hover:bg-black hover:text-white ">
                          Add to cart
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default ProductDetails;
