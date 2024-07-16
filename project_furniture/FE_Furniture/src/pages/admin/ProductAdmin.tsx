import SideBar from "./component/SideBar";
import HeaderAdmin from "./component/HeaderAdmin";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Link } from "react-router-dom";

const ProductAdmin = () => {
  return (
    <div className="bg-slate-50">
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />
        <HeaderAdmin>
          <Product />
        </HeaderAdmin>
      </section>
    </div>
  );
};

const Product = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <>
      <div className="my-3">
        <Link
          to={""}
          className="text-white font-semibold py-1 px-3 bg-lime-500 text-center "
        >
          Add Product
        </Link>
        <input
          type="search"
          className="py-1 ml-3"
          placeholder="Search....."
          name=""
          id=""
        />
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ProductAdmin;
