import { useAppContext } from "@/contexts/AppContext";
import { TaskInterface } from "@/interfaces/task-interface";
import { useContext } from "react";

let GLOBAL_TASKS_INDEX = 1000;

const taskCreateID = (): number => {
    return GLOBAL_TASKS_INDEX++
}

const taskCreate = ({ title, description, due, estimate }: Partial<TaskInterface>): TaskInterface => {
    return {
        id: taskCreateID(),
        title: title as string,
        description: description as string,
        due: due as Date,
        estimate,
        isComplete: false,
        completionDate: null
    }
}

const useTask = () => {

    const context = useAppContext()
    const taskAdd = (task: TaskInterface) => {
        context.setTasks(tasks => [...tasks, task]);
    }

    const taskRemove = (task: TaskInterface) => {
        context.setTasks(tasks => tasks.filter(t => t.id != task.id));
    }

    const taskUpdate = (task: TaskInterface) => {
        context.setTasks(tasks => tasks.map(t => t.id == task.id ? { ...task } : t));
    }

    return {
        taskAdd,
        taskUpdate,
        taskRemove
    }

}

export { taskCreate, useTask }
