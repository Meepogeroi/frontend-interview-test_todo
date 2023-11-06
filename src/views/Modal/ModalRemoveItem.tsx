/* VENDOR */
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "./Modal";
import { ModalHeader } from "../../components/modal/ModalElements/ModalHeader";
import { ModalText } from "../../components/modal/ModalElements/ModalText";
import { ModalFooter } from "../../components/modal/ModalElements/ModalFooter";
import { tasksRemoved, tasksClearedCategories } from "../../utils/Slices/tasksSlice";
import { categoriesRemoved } from "../../utils/Slices/categoriesSlice";

interface ModalRemoveItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalRemoveItem: React.FC<ModalRemoveItemProps> = ({
  item,
  active,
  setActive,
}) => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    isCategories: boolean = pathname.includes("categories"),
    text: string = !isCategories ? `Вы уверены, что хотите удалить задачу "${item.name}"?` : `Вы уверены, что хотите удалить категорию "${item.name}"?`;

  return (
    <Modal item={item} active={active} setActive={setActive}>
      <ModalHeader setActive={setActive} title={ !isCategories ? "Удаление задачи" : "Удаление категории" } />
      <ModalText text={text} />
      <ModalFooter
        setActive={setActive}
        submitBtnText="Да"
        onSubmit={
          isCategories
            ? () => {
                dispatch(categoriesRemoved(item.id));
                dispatch(tasksClearedCategories(item.id));
              }
            : () => dispatch(tasksRemoved(item.id))
        }
      />
    </Modal>
  );
};
