import SideBar from "../../../components/SideBar";
import HeaderAdmin from "../../../components/HeaderAdmin";
import { Space, Table, TableColumnsType, Button } from "antd";
import { Order } from "../../../interfaces/Cart";
import { memo, useContext, useState } from "react";
import Modal from "../../../components/Modal";
import { OrderContext } from "../../../store/contexts/OrderContext";
import { CartContext } from "../../../store/contexts/CartContext";
import { formatToVietnamTime } from "../../../utils/formatToVietnamTime";
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
  const { orderState } = useContext(OrderContext);
  const { updateOrderStatus } = useContext(CartContext);
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
      render: (orderDate) => <span>{formatToVietnamTime(orderDate)}</span>,
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
      render: (_, record) => {
        const { paymentStatus } = record;

        return (
          <Space size="middle">
            <>
              {paymentStatus === "Pending" && (
                <>
                  <Button
                    onClick={() => updateOrderStatus(record._id!, "Cancelled")}
                    className="py-1 border border-red-500 px-3 bg-white text-red-500 font-semibold hover:text-white hover:bg-red-500 transition-all duration-1000 rounded"
                  >
                    Cancelled
                  </Button>
                  <button
                    onClick={() => handleClick(record)}
                    className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
                  >
                    <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
                  </button>
                </>
              )}
              {paymentStatus === "Cancelled" && (
                <>
                  <Button
                    onClick={() => updateOrderStatus(record._id!, "Confirmed")}
                    className="py-1 border border-purple-500 px-3 bg-white text-purple-500 font-semibold hover:text-white hover:bg-purple-500 transition-all duration-1000 rounded"
                  >
                    Confirmed
                  </Button>
                  <button
                    onClick={() => handleClick(record)}
                    className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
                  >
                    <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
                  </button>
                </>
              )}
              {paymentStatus === "Payment Completed" && (
                <>
                  <Button
                    onClick={() => updateOrderStatus(record._id!, "Shipped")}
                    className="py-1 border border-yellow-500 px-3 bg-white text-yellow-500 font-semibold hover:text-white hover:bg-yellow-500 transition-all duration-1000 rounded"
                  >
                    Shipped
                  </Button>
                  <button
                    onClick={() => handleClick(record)}
                    className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
                  >
                    <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
                  </button>
                </>
              )}
              {paymentStatus === "Shipped" && (
                <>
                  <Button
                    onClick={() =>
                      updateOrderStatus(record._id!, "Delivery Successful")
                    }
                    className="py-1 border border-blue-500 px-3 bg-white text-blue-500 font-semibold hover:text-white hover:bg-blue-500 transition-all duration-1000 rounded"
                  >
                    Delivery Successful
                  </Button>
                  <button
                    onClick={() => handleClick(record)}
                    className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
                  >
                    <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
                  </button>
                </>
              )}
              {paymentStatus === "Confirmed" && (
                <>
                  <Button
                    onClick={() => updateOrderStatus(record._id!, "Shipped")}
                    className="py-1 border border-yellow-500 px-3 bg-white text-yellow-500 font-semibold hover:text-white hover:bg-yellow-500 transition-all duration-1000 rounded"
                  >
                    Shipped
                  </Button>
                  <button
                    onClick={() => handleClick(record)}
                    className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
                  >
                    <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
                  </button>
                </>
              )}
              {paymentStatus === "Delivery Successful" && (
                <>
                  <span className="text-blue-500">Delivery Successful</span>
                  <button
                    onClick={() => handleClick(record)}
                    className="border size-8 rounded-full transition-all duration-1000 hover:bg-black hover:text-white group"
                  >
                    <i className="fa-solid fa-info text-xs p-1 text-center text-gray-400 group hover:text-white"></i>
                  </button>
                </>
              )}
              <MemoizedModal
                showModal={showModal}
                order={order}
                setShowModal={setShowModal}
              />
            </>
          </Space>
        );
      },
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
      <Table columns={columns} dataSource={orderState.orderCharts} />
      <MemoizedModal
        showModal={showModal}
        order={order}
        setShowModal={setShowModal}
      />
    </>
  );
};
export default OrderAdmin;
