import { renderHook, act } from '@testing-library/react-hooks'
import { useTask } from '../task-handler'
import { AppContextProvider, useAppContext } from '@/contexts/AppContext'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'

describe('task-handler', () => {
    it('create tasks', () => {
        // test taskCreate
    })
    //test hook
    describe('useTask() hook', () => {
        const mockTask = {
            "id": 9000,
            "title": "Task 0",
            "description": "do this very long task man come on man",
            "due": new Date("2025-10-29T17:28:09.998Z"),
            "estimate": 10,
            "isComplete": false,
            "completionDate": new Date()
        };
        let result: any;
        let taskAdd: any;
        let taskRemove: any;
        let taskUpdate: any;
        let initialTasks: number;
        beforeEach(() => {
            const { result: renderedResult } = renderHook(() => ({ useTask: useTask(), useAppContext: useAppContext() })
                , { wrapper: AppContextProvider })
            result = renderedResult
            taskAdd = result.current.useTask.taskAdd
            taskRemove = result.current.useTask.taskRemove
            taskUpdate = result.current.useTask.taskUpdate
            initialTasks = result.current.useAppContext.tasks.length

        })
        it('adds tasks', () => {
            act(() => taskAdd(mockTask))
            expect(result.current.useAppContext.tasks.length).toBe(initialTasks + 1)
            expect(result.current.useAppContext.tasks.at(-1).id).toBe(9000)
        })
        it('update tasks', () => {
            act(() => taskAdd(mockTask))
            expect(result.current.useAppContext.tasks.at(0).isComplete).toBe(false)
            act(() => taskUpdate({ ...mockTask, isComplete: true }))
            expect(result.current.useAppContext.tasks.at(-1).isComplete).toBe(true)
        })
        it('remove tasks', () => {
            act(() => taskAdd(mockTask))
            act(() => taskRemove(mockTask))
            expect(result.current.useAppContext.tasks.length).toBe(initialTasks)
            act(() => taskRemove(result.current.useAppContext.tasks.at(0)))
            expect(result.current.useAppContext.tasks.length).toBe(initialTasks - 1)
        })
    })
})
