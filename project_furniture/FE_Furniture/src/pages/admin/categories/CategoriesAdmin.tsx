import SideBar from "../../../components/SideBar";
import HeaderAdmin from "../../../components/HeaderAdmin";
import { Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import { Categories } from "../../../interfaces/Categories";
import { CategoriesContext } from "../../../store/contexts/CategoriesContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ModalCategoryForm from "./ModalCategoryForm";

const CategoriesAdmin = () => {
  return (
    <div className="bg-slate-50">
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />

        <div className="col-span-9">
          <HeaderAdmin />
          <CategoriesList />
        </div>
      </section>
    </div>
  );
};

const CategoriesList = () => {
  const { category, handleDelete } = useContext(CategoriesContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [categoryUpdate, setCategoryUpdate] = useState<Categories | undefined>(
    undefined
  );
  const columns: ColumnType<Categories>[] = [
    {
      title: "ID Category",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <a>{_id}</a>,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
            onClick={() => handleDelete(record._id!)}
            className="text-white border bg-red-500 py-1 px-4 rounded font-semibold"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
  const handleClick = (category?: Categories) => {
    if (category) {
      setCategoryUpdate(category);
    } else {
      setCategoryUpdate(undefined);
    }
    setShowModal(true);
  };
  return (
    <div className="bg-white rounded-lg">
      <div className="py-3 px-2">
        <Link
          to=""
          className="text-white font-semibold py-1 px-3 bg-lime-500 text-center inline-block rounded-lg shadow-md hover:bg-gradient-to-r from-lime-500 to-lime-600 transition-colors duration-300"
          onClick={() => handleClick()}
        >
          Add Category
        </Link>
      </div>
      <ModalCategoryForm
        showModal={showModal}
        setShowModal={setShowModal}
        categoryUpdate={categoryUpdate}
      />
      <Table
        columns={columns}
        dataSource={category.categories.map((category) => ({
          ...category,
          key: category._id,
        }))}
      />
    </div>
  );
};

export default CategoriesAdmin;
