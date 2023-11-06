/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import { ListItem } from "../../components/ListItem/ListItem";
import { TasksState, selectAllTasks } from "../../utils/Slices/tasksSlice";

export const Tasks: React.FC = () => {
  const tasks: TasksState[] = useSelector(selectAllTasks);

  return (
    <ul>
      {tasks.map((task: TasksState) => (
        <ListItem key={task.id} item={task} />
      ))}
    </ul>
  );
};

// можно попробовать вынести svg в отдельный файл в виде кода
