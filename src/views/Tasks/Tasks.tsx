/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import { ListItem } from "../../components/ListItem/ListItem";
import { selectAllTasks } from "../../utils/Slices/tasksSlice";

export const Tasks: React.FC = () => {
  const tasks = useSelector(selectAllTasks);

  return (
    <ul>
      {tasks.map((task) => (
        <ListItem key={task.id} item={task} />
      ))}
    </ul>
  );
};

// можно попробовать вынести svg в отдельный файл в виде кода
