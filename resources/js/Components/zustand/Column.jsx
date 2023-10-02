import { useStore } from "@/Context/store";
import Task from "./Task";
import { shallow } from "zustand/shallow";

const Column = ({ status }) => {
    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.status === status),
        shallow
    );

    return (
        <div className="column">
            <h3 className="mb-2 text-lg text-center">{status}</h3>
            {tasks.map((task, index) => (
                <Task
                    key={`task-${index}`}
                    title={task.title}
                    status={task.status}
                />
            ))}
        </div>
    );
};

export default Column;
