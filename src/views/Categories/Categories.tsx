/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import { ListItem } from "../../components/ListItem/ListItem";
import { CategoriesState, selectAllCategories } from "../../utils/Slices/categoriesSlice";

export const Categories = () => {
  const categories: CategoriesState[] = useSelector(selectAllCategories);

  return (
    <ul>
      {categories.map((category: CategoriesState) => (
        <ListItem key={category.id} item={category} />
      ))}
    </ul>
  );
};
