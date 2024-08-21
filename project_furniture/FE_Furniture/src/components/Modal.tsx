import { useCallback, useEffect, useState } from "react";
import instance from "../api";
import { Order, OrderItem } from "../interfaces/Cart";
import { User } from "../interfaces/User";
import { Address } from "../interfaces/Location";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order | undefined;
};
const Modal = ({ showModal, setShowModal, order }: Props) => {
  const [userOrder, setUserOrder] = useState<User | undefined>(undefined);
  const [addressOrder, setAddressOrder] = useState<Address | undefined>(
    undefined
  );
  const userId =
    order?.userId && typeof order.userId !== "string"
      ? order.userId
      : undefined;
  const addressId =
    typeof order?.addressId === "string" ? order.addressId : undefined;

  // get user order
  const getUserOrder = useCallback(async (userId: User) => {
    try {
      const res = await instance.get(`/auth/get-detail-auth/${userId._id}`);
      setUserOrder(res.data.datas);
    } catch (error) {
      console.error(error);
    }
  }, []);
  // get address order

  const getAddressOrder = useCallback(async (addressId: string) => {
    try {
      const res = await instance.get(`/address/${addressId}`);
      setAddressOrder(res.data.datas);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    if (userId) {
      getUserOrder(userId);
    }
    if (addressId) {
      getAddressOrder(addressId);
    }
  }, [userId, addressId]);

  const orderItems: OrderItem[] = order?.orderItems || [];

  const productOrder = orderItems.map((item) => {
    console.log(item);
    const product = item.productId;
    return {
      quantity: item.quantity,
      price: item.price,
      image: product.imageProduct,
      name: product.productName,
    };
  });
  const totalPriceOrder = productOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Order Details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-slate-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <i className="fa-solid fa-xmark text-black"></i>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto max-h-[80vh]">
                  <div className="font-sans text-gray-800 p-5">
                    <div className="flex gap-4 py-4">
                      <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-gray-300">
                        <h4 className="text-lg text-gray-800 mb-2">
                          Thông tin đặt hàng
                        </h4>
                        <p className="my-1">{userOrder?.userName}</p>
                        <p className="my-1">{userOrder?.email}</p>
                        <p className="my-1">{userOrder?.phone}</p>

                        <h4 className="text-lg text-gray-800 mt-4 mb-2">
                          Phương thức thanh toán
                        </h4>
                        <p className="my-1">Thanh toán khi nhận hàng (COD)</p>

                        <h4 className="text-lg text-gray-800 mt-4 mb-2">
                          Thông tin đơn hàng
                        </h4>
                        <p className="my-1">
                          Mã đơn hàng: #{order?._id?.slice(19).toUpperCase()}
                        </p>
                      </div>

                      <div className="flex-1 bg-green-50 p-4 rounded-lg border border-gray-300 ml-2">
                        <h4 className="text-lg text-gray-800 mb-2">
                          Địa chỉ nhận hàng
                        </h4>
                        <p className="my-1">{userOrder?.userName}</p>
                        <p className="my-1">{`${addressOrder?.street}, ${addressOrder?.ward}, ${addressOrder?.district}, ${addressOrder?.city}, ${addressOrder?.country}`}</p>
                        <p className="my-1">{userOrder?.phone}</p>

                        <h4 className="text-lg text-gray-800 mt-4 mb-2">
                          Trạng thái đơn hàng
                        </h4>
                        <p className="my-1">{order?.paymentStatus}</p>

                        <h4 className="text-lg text-gray-800 mt-4 mb-2">
                          Ngày đặt hàng
                        </h4>
                        <p className="my-1">{order?.orderDate}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4 className="text-lg text-gray-800 mb-2">
                        Chi tiết đơn hàng
                      </h4>
                      <table className="w-full border-collapse mt-2">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-gray-300 p-2 text-left">
                              Ảnh
                            </th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">
                              Tên sản phẩm
                            </th>
                            <th className="border-b-2 border-gray-300 p-2 text-right">
                              Giá
                            </th>
                            <th className="border-b-2 border-gray-300 p-2 text-right">
                              Số lượng
                            </th>
                            <th className="border-b-2 border-gray-300 p-2 text-right">
                              Tổng tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productOrder.map((item, index) => (
                            <tr key={index}>
                              <td className="py-2 text-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="size-20"
                                />
                              </td>
                              <td className="p-2">{item.name}</td>
                              <td className="p-2 text-right">
                                {(item.price * 25000).toLocaleString()} VND
                              </td>
                              <td className="p-2 text-right">
                                {item.quantity}
                              </td>
                              <td className="p-2 text-right">
                                {(
                                  item.price *
                                  item.quantity *
                                  25000
                                ).toLocaleString()}{" "}
                                VND
                              </td>
                            </tr>
                          ))}

                          <tr>
                            <td
                              colSpan={4}
                              className="p-2 text-right font-bold"
                            >
                              Tổng cộng:{" "}
                              {(totalPriceOrder * 25000).toLocaleString()} VND
                            </td>
                            <td className="p-2 text-right font-bold">
                              {(totalPriceOrder * 25000).toLocaleString()} VND
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
