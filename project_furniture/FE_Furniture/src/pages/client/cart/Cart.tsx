import { useContext } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { CartContext } from "../../../store/contexts/CartContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../store/contexts/AuthContext";

const Cart = () => {
  const {
    cartState,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    handleDeleteCart,
  } = useContext(CartContext);
  const { userState } = useContext(AuthContext);
  const userId: string | number = userState.users?.id || "";

  return (
    <>
      <Header />
      <main className="mb-16">
        <div className="mx-44 mt-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-9">
              {/* giỏ hàng trống */}
              {cartState.cartItems.length === 0 ? (
                <div className="cart-empty text-center">
                  <img
                    className="h-48 m-auto"
                    src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/empty-cart.png?1716045319283"
                    alt=""
                  />
                  <div className="mt-10">
                    <Link
                      className="py-3 px-5 border border-black bg-black text-white text-lg hover:bg-transparent hover:text-black hover:border-black transition-all duration-1000 border border-transparent hover:border-black"
                      to="/"
                    >
                      Continue Choosing
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-semibold tracking-wider">
                          Subtotal
                        </th>
                        <th className="px-6 py-3 bg-gray-100"></th>
                      </tr>
                    </thead>
                    {cartState.cartItems.map((item) => (
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="pr-6 py-4 whitespace-no-wrap">
                            <div className="flex items-center">
                              <img
                                className="h-14 w-14"
                                src={item.product.imageProduct}
                                alt=""
                              />
                              <span className="ml-4 text-sm font-semibold text-gray-400">
                                {item.product.productName}
                              </span>
                            </div>
                          </td>
                          <td className="pr-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 font-semibold">
                            {item.product.price} $
                          </td>
                          <td className="pl-4 py-4 whitespace-no-wrap">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  item.quantity <= 1
                                    ? handleDeleteCart(userId, item.product._id)
                                    : decreaseQuantity(item.product._id)
                                }
                                className="px-2 py-1"
                              >
                                -
                              </button>
                              <p className="px-3 py-1">{item.quantity}</p>
                              <button
                                onClick={() =>
                                  increaseQuantity(item.product._id)
                                }
                                className="px-2 py-1"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="pl-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 font-semibold">
                            {(item.product.price! * item.quantity).toFixed(2)} $
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-xl text-red-500">
                            <button
                              onClick={() =>
                                handleDeleteCart(userId, item.product._id)
                              }
                              type="button"
                            >
                              <i className="ti ti-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </>
              )}
            </div>
            <div className="col-span-3">
              <div className="w-full bg-gray-100">
                <div className="cart-total mx-6">
                  <div className=" border-b-2 border-gray-200">
                    <h1 className="text-2xl font-bold py-3">Cart Total</h1>
                  </div>
                  <div className="my-3">
                    <p className="font-semibold text-sm inline-block">
                      Subtotal
                    </p>
                    <p className="price text-sm text-gray-300 font-semibold float-right">
                      {totalPrice.toFixed(2)} $
                    </p>
                  </div>

                  <div className="total">
                    <p className="font-semibold text-sm inline-block">Total</p>
                    <p className="price text-lg text-red-500 font-bold float-right">
                      {totalPrice.toFixed(2)} $
                    </p>
                  </div>

                  <button
                    className="border-2 py-2 px-16 ml-2 my-6 border-black rounded text-black hover:bg-black hover:text-white transition-all duration-1000 font-semibold "
                    type="button"
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;
