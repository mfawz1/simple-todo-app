// this app context should serve as a global store.

import { TaskInterface } from "@/interfaces/task-interface";
import { createContext, Dispatch, SetStateAction, useContext, useState, type ReactNode } from "react";

interface AppContextInterface {
    tasks: TaskInterface[],
    setTasks: Dispatch<SetStateAction<TaskInterface[]>>
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);


const AppContextProvider = ({ children }: { children: ReactNode }) => {
    // tasks are initialized to an empty array, if migrating to persistent storage it should be loaded here.
    const [tasks, setTasks] = useState<TaskInterface[]>([

        {
            "id": 0,
            "title": "Task 0",
            "description": "do this very long task man come on man",
            "due": new Date("2025-10-29T17:28:09.998Z"),
            "estimate": 10,
            "isComplete": false,
            "completionDate": null
        },
        {
            "id": 1,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },
        {
            "id": 2,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },
        {
            "id": 3,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },
        {
            "id": 4,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },

        {
            "id": 5,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },
        {
            "id": 6,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },
        {
            "id": 7,
            "title": "add task removal",
            "description": "new task",
            "due": new Date("2025-10-29T17:38:00.000Z"),
            "estimate": 10,
            "isComplete": true,
            "completionDate": null
        },
    ])
    const appContextValue: AppContextInterface = {
        tasks, setTasks
    }
    return <AppContext.Provider value={appContextValue}>
        {children}
    </AppContext.Provider>
}


// note: maybe extract AppContext as a dependency 
const useAppContext = (): AppContextInterface => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within AppContextProvider');
    }
    return context;
}


export { type AppContextInterface, AppContextProvider, useAppContext }
