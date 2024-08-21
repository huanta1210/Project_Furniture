import { memo, useContext, useState } from "react";
import { Space, Table, TableColumnsType } from "antd";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import LogOut from "../../../components/LogOut";
import { AuthContext } from "../../../store/contexts/AuthContext";
import { CartContext } from "../../../store/contexts/CartContext";
import { Order } from "../../../interfaces/Cart";
import Modal from "../../../components/Modal";
const MemoizedModal = memo(Modal);
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

const YourOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const { userState } = useContext(AuthContext);
  const { cartState } = useContext(CartContext);
  console.log(cartState.orders);
  const columns: TableColumnsType<Order> = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <a>#{_id.slice(19).toUpperCase()}</a>,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (total) => (total * 25000).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <button className="py-1 border border-red-500 px-3 bg-white text-red-500 font-semibold hover:text-white hover:bg-red-500 transition-all duration-1000 rounded">
              Cancelled
            </button>
            <button
              onClick={() => handleClick(record)}
              className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
            >
              <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
            </button>
            <MemoizedModal
              showModal={showModal}
              order={order}
              setShowModal={setShowModal}
            />
          </>
        </Space>
      ),
    },
  ];
  const payload = [
    {
      name: "Account Infomation",
      path: "/login",
    },
    {
      name: "Your Order",
      path: "/your-order",
    },
    {
      name: "Forgot Password",
      path: "/forgot-password",
    },
  ];
  const handleClick = (order: Order) => {
    if (order) {
      setOrder(order);
    } else {
      setOrder(undefined);
    }
    setShowModal(true);
  };
  return (
    <>
      <header>
        <MemoizedHeader />
      </header>

      <main className="mx-20 my-10">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <h2 className="text-xl font-bold">Account Page</h2>
            <p className="text-sm font-semibold py-3 mb-3">
              Hello! {userState.users?.userName}
            </p>
            {payload.map((payload, index) => (
              <div key={index}>
                <Link
                  className="text-sm text-gray-600 hover:text-red-400"
                  to={payload.path}
                >
                  {payload.name}
                </Link>
              </div>
            ))}

            <div className="mt-2">
              <LogOut />
            </div>
          </div>
          <div className="col-span-10">
            <Table columns={columns} dataSource={cartState.orders} />
          </div>
        </div>
      </main>
      <footer>
        <MemoizedFooter />
      </footer>
    </>
  );
};

export default YourOrder;
