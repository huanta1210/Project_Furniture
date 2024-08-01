import SideBar from "../component/SideBar";
import HeaderAdmin from "../component/HeaderAdmin";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Product } from "../../../interfaces/Product";
import { useContext, useState } from "react";
import type { ColumnType } from "antd/es/table";
import ModalAdd from "./ModalShowForm";
import { ProductContext } from "../../../store/contexts/ProductContext";

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
  const [showModal, setShowModal] = useState<boolean>(false);

  const { state, handleDelete } = useContext(ProductContext);

  const [productUpdate, setProductUpdate] = useState<Product | undefined>(
    undefined
  );

  const handleClick = (product?: Product) => {
    if (product) {
      setProductUpdate(product);
    } else {
      setProductUpdate(undefined);
    }
    setShowModal(true);
  };

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
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (number) => <a>{number}</a>,
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
      title: "Category",
      dataIndex: "categoriesId",
      key: "categoriesId",
      render: (categoriesId) => <a>{categoriesId.categoryName}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleClick(record)}
            className="text-white border bg-blue-500 py-1 px-4 rounded font-semibold"
          >
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

  return (
    <div className="bg-white rounded-lg">
      <div className="py-3 px-2">
        <Link
          to=""
          className="text-white font-semibold py-1 px-3 bg-lime-500 text-center inline-block rounded-lg shadow-md hover:bg-gradient-to-r from-lime-500 to-lime-600 transition-colors duration-300"
          onClick={() => handleClick()}
        >
          Add Product
        </Link>
        <input
          type="search"
          className="py-1 ml-3 outline-none rounded-lg bg-gray-100 pl-2"
          placeholder="Search....."
        />
        <ModalAdd
          showModal={showModal}
          setShowModal={setShowModal}
          currentProduct={productUpdate}
        />
      </div>
      <Table
        columns={columns}
        dataSource={state.products.map((product) => ({
          ...product,
          key: product._id,
        }))}
      />
    </div>
  );
};

export default ProductAdmin;
