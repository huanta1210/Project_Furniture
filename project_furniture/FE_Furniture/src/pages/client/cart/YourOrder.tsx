import { useContext } from "react";
import { Space, Table, TableColumnsType } from "antd";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import LogOut from "../../../components/LogOut";
import { AuthContext } from "../../../store/contexts/AuthContext";
import { User } from "../../../interfaces/User";

const YourOrder = () => {
  const { userState } = useContext(AuthContext);
  const columns: TableColumnsType<User> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      key: "totalAmount",
      dataIndex: "totalAmount",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <>
            <button className="py-1 border border-red-500 px-3 bg-red-500 text-white font-semibold hover:text-red-500 hover:bg-white transition-all duration-1000 rounded">
              Cancelled
            </button>
            <button className="py-1 border border-lime-500 px-3 bg-lime-500 text-white font-semibold hover:text-red-500 hover:bg-white transition-all duration-1000 rounded">
              Payment Completed
            </button>
          </>
        </Space>
      ),
    },
  ];
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="mx-20 my-10">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <h2 className="text-xl font-bold mt-5">Account Page</h2>
            <p className="text-sm font-semibold py-3 mb-3">
              Hello! {userState.users?.userName}
            </p>
            <div>
              <Link className="text-sm text-gray-600 hover:text-red-400" to="">
                Account Infomation
              </Link>
            </div>
            <div className="py-2">
              <Link
                className="text-sm text-gray-600 hover:text-red-400"
                to="/your-order"
              >
                Your Order
              </Link>
            </div>
            <div>
              <Link className="text-sm text-gray-600 hover:text-red-400" to="">
                Forgot Password
              </Link>
            </div>
            <div className="mt-2">
              <LogOut />
            </div>
          </div>
          <div className="col-span-10">
            <Table columns={columns} dataSource={userState.users} />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default YourOrder;
