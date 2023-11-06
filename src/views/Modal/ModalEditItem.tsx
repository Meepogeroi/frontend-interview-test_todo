/* VENDOR */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "./Modal";
import { ModalHeader } from "../../components/modal/ModalElements/ModalHeader";
import { ModalRow } from "../../components/modal/ModalElements/ModalRow";
import { ModalInput } from "../../components/modal/ModalElements/ModalInput";
import { ModalTextarea } from "../../components/modal/ModalElements/ModalTextarea";
import { ModalFooter } from "../../components/modal/ModalElements/ModalFooter";
import { tasksUpdated } from "../../utils/slices/tasksSlice";
import { categoriesUpdated } from "../../utils/slices/categoriesSlice";

interface ModalEditItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalEditItem: React.FC<ModalEditItemProps> = ({
  item,
  active,
  setActive,
}) => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    isCategories = pathname.includes("categories"),
    [name, setName] = useState(item.name),
    [selected, setSelected] = useState(item.category || ""),
    [description, setDescription] = useState(item.description);

  function clearState() {
    setName(item.name);
    setDescription(item.description);
    setSelected(item.category || "");
  }

  return (
    <Modal item={item} active={active} setActive={setActive} clearState={clearState}>
      <ModalHeader
        setActive={setActive}
        title={
          isCategories ? "Редактирование категории" : "Редактирование задачи"
        }
      />
      {isCategories ? (
        <ModalInput name={name} setName={setName} size="large" />
      ) : (
        <ModalRow
          name={name}
          setName={setName}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <ModalTextarea
        description={description}
        setDescription={setDescription}
      />
      <ModalFooter
        setActive={setActive}
        clearState={clearState}
        submitBtnText="Сохранить"
        size="large"
        onSubmit={() => {
          dispatch(
            isCategories
              ? categoriesUpdated({ id: item.id, name, description })
              : tasksUpdated({
                id: item.id,
                name,
                description,
                category: selected,
              })
          );
          setActive(false);
        }}
      />
    </Modal>
  );
};
