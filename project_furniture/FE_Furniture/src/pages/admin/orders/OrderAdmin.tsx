import SideBar from "../../../components/SideBar";
import HeaderAdmin from "../../../components/HeaderAdmin";
import { Space, Table, TableColumnsType } from "antd";
import { Order } from "../../../interfaces/Cart";
import { memo, useContext, useState } from "react";
import { CartContext } from "../../../store/contexts/CartContext";
import Modal from "../../../components/Modal";
const MemoizedModal = memo(Modal);

const OrderAdmin = () => {
  return (
    <div className="bg-slate-50">
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />

        <div className="col-span-9">
          <HeaderAdmin />
          <OrderList />
        </div>
      </section>
    </div>
  );
};

const OrderList = () => {
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const { cartState } = useContext(CartContext);
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
      <Table columns={columns} dataSource={cartState.orders} />
      <MemoizedModal
        showModal={showModal}
        order={order}
        setShowModal={setShowModal}
      />
    </>
  );
};
export default OrderAdmin;
