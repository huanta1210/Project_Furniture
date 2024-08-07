import { useContext } from "react";
import { CategoriesContext } from "../store/contexts/CategoriesContext";

const FilterCategory = () => {
  const { category, getDetailCategory } = useContext(CategoriesContext);
  const handleCategoryChange = (categoryId: string | number) => {
    getDetailCategory(categoryId);
  };

  return (
    <div className="text-center mt-10">
      {category.categories.map((category) => (
        <button
          type="button"
          onClick={() => handleCategoryChange(category._id)}
          className="mr-2 border px-2 py-0,5 border-indigo-500 text-base font-normal rounded text-black transition-all duration-1000 hover:bg-indigo-500 hover:text-white"
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default FilterCategory;
