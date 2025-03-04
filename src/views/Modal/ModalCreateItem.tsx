/* VENDOR */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "./Modal";
import { ModalHeader } from "../../components/modal/ModalElements/ModalHeader";
import { ModalInput } from "../../components/modal/ModalElements/ModalInput";
import { ModalRow } from "../../components/modal/ModalElements/ModalRow";
import { ModalTextarea } from "../../components/modal/ModalElements/ModalTextarea";
import { ModalFooter } from "../../components/modal/ModalElements/ModalFooter";
import { tasksAdded } from "../../utils/Slices/tasksSlice";
import { categoriesAdded } from "../../utils/Slices/categoriesSlice";

interface ModalCreateItemProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateItem: React.FC<ModalCreateItemProps> = ({
  active,
  setActive,
}) => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    isCategories: boolean = pathname.includes("categories"),
    [name, setName] = useState(""),
    [selected, setSelected] = useState(""),
    [description, setDescription] = useState("");

  function clearState() {
    setName("");
    setDescription("");
    setSelected("");
  }

  return (
    <Modal active={active} setActive={setActive} clearState={clearState}>
      <ModalHeader
        clearState={clearState}
        setActive={setActive}
        title={!isCategories ? "Создание задачи" : "Создание категории"}
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
        submitBtnText="Создать"
        size="large"
        onSubmit={
          name
            ? () => {
              dispatch(
                isCategories
                  ? categoriesAdded({ name, description })
                  : tasksAdded({
                    name,
                    description,
                    category: selected,
                  })
              );
              clearState();
              setActive(false);
            }
            : () => { }
        }
      />
    </Modal>
  );
};
