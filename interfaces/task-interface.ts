interface TaskInterface {
    id: number,
    title: string,
    description: string,
    due: Date, // Due can be refactored as optional.
    estimate?: number, // estimate is optional, if estimate is null, 0 or less it will not show.
    isComplete: boolean,
    completionDate: Date | null
}

export { type TaskInterface }
