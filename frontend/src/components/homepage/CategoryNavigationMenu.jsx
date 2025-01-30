import { CardBoarder } from "./CardBoarder";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/categoryActions";
import { Link } from "react-router-dom";

export const CategoryNavigationMenu = () => {
  const dispatch = useDispatch();
  const { error, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // ** Unique categories ko store karna **
  const uniqueCategories = [];
  const categoryMap = new Map();

  categories?.forEach((category) => {
    if (!categoryMap.has(category.name)) {
      categoryMap.set(category.name, []);
      uniqueCategories.push(category);
    }
    categoryMap.get(category.name).push(category._id);
  });

  return (
    <CardBoarder className="bg-primary-page-color w-full md:w-1/5 p-4 rounded-md border">
      {error && <div className="text-red-500">Error loading categories</div>}
      {uniqueCategories.length > 0 ? (
        uniqueCategories.map((category) => {
          // ** Pick only one ID instead of multiple **
          const categoryId = categoryMap.get(category.name)[0];
          return (
            <Link
              to={`/priceRange/products/${categoryId}`}
              key={category._id}
              className="flex items-center text-gray-500 hover:text-[#4222c4de] justify-start text-sm md:text-[15px] font-medium px-2 py-2 rounded-md bg-white hover:bg-gray-100 transition mb-2"
            >
              {/* Icon for the category */}
              <Icon
                icon="mdi:category"
                className="text-xl mr-2"
                color="#4222c4de"
              />
              {/* Category name */}
              {category.name}
            </Link>
          );
        })
      ) : (
        <div>No categories available</div>
      )}
    </CardBoarder>
  );
};
