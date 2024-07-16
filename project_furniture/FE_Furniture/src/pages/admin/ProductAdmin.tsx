import SideBar from "./component/SideBar";
import HeaderAdmin from "./component/HeaderAdmin";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";
import { toast } from "react-toastify";
import instance from "../../api";
import { useEffect, useState } from "react";
import type { ColumnType } from "antd/es/table";

const ProductAdmin = () => {
  return (
    <div className="bg-slate-50">
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />

        <div className="col-span-9">
          <HeaderAdmin />
          <ProductList />
        </div>
      </section>
    </div>
  );
};

const ProductList = () => {
  const [products, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    getProduct();
  }, []);
  const columns: ColumnType<Product>[] = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (number) => <a>{number}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Image",
      dataIndex: "imageProduct",
      key: "imageProduct",
      render: (imageProduct) => (
        <img src={imageProduct} alt="Preview" style={{ maxWidth: "80px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="text-white border bg-blue-500 py-1 px-4 rounded font-semibold">
            Edit
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="text-white border bg-red-500 py-1 px-4 rounded font-semibold"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
  const getProduct = async () => {
    try {
      const res = await instance.get("/product");
      if (!res) {
        toast.error("Get product failed");
      }
      console.log(res.data.datas);
      setProduct(res.data.datas);
    } catch (error) {
      console.log(error);
      toast.error("Error getting product");
    }
  };

  const handleDelete = async (id: string | number) => {
    console.log("sdkjaf", id);

    try {
      const confirmPassword = window.confirm("Are you sure you want to delete");

      if (confirmPassword) {
        const res = await instance.delete(`/product/delete-product/${id}`);
        console.log(res);
        if (!res) {
          toast.error("Get data product deleted unsuccessful");
        }
        toast.success("Product deleted successfully");
        getProduct();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error API: " + error);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="py-3 px-2">
        <Link
          to={""}
          className="text-white font-semibold py-1 px-3 bg-lime-500 text-center "
        >
          Add Product
        </Link>
        <input
          type="search"
          className="py-1 ml-3 outline-none bg-gray-100 pl-2"
          placeholder="Search....."
        />
      </div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default ProductAdmin;
