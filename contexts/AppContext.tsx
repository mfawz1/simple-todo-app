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
    const [tasks, setTasks] = useState<TaskInterface[]>([])
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
