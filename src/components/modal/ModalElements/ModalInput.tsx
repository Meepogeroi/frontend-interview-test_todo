import important from "../../../assets/Icons/important.svg";
import { useLocation } from "react-router-dom";

interface ModalInputProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  size?: string;
}

export const ModalInput: React.FC<ModalInputProps> = ({
  name,
  setName,
  size,
}) => {
  const { pathname } = useLocation(),
    isCategories = pathname.includes("categories")

  return (
    <div
      className={
        size === "large" ? "modalinput-wrapper large" : "modalinput-wrapper"
      }
    >
      <input
        id="modalinput"
        className="modalinput"
        placeholder={ !isCategories ? "Введите имя задачи" : "Введите имя категории" }
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={20}
      />
      <img src={important} alt="important" className="modalinput-icon" />
      <label htmlFor="modalinput">Имя</label>
    </div>
  );
};
