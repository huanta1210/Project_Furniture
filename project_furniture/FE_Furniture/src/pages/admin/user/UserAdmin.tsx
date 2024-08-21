import { useContext } from "react";
import HeaderAdmin from "../../../components/HeaderAdmin";
import SideBar from "../../../components/SideBar";
import { UserContext } from "../../../store/contexts/UserContext";
import { User } from "../../../interfaces/User";
import { Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";

const UserAdmin = () => {
  return (
    <div className="bg-slate-50">
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />

        <div className="col-span-9">
          <HeaderAdmin />
          <UserList />
        </div>
      </section>
    </div>
  );
};
const UserList = () => {
  const { state } = useContext(UserContext);
  const columns: ColumnType<User>[] = [
    {
      title: "Image",
      dataIndex: "photos",
      key: "photos",
      render: (photos) => <img className="size-12 rounded-full" src={photos} />,
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button className="text-white border border-2 size-8 rounded-full font-semibold">
            <i className="fa-solid fa-info text-center text-black"></i>
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <Table
        columns={columns}
        dataSource={state.users.map((user) => ({
          ...user,
          key: user._id,
        }))}
      />
    </div>
  );
};

export default UserAdmin;
