export type ActionType = {
    type: string
    [key: string]: any
}

export type StateReducerType = {
    age: number
    childrenCount: number
    name: string
}


export const userReducer = (state: StateReducerType, action: ActionType): StateReducerType => {
    switch (action.type) {
        case "INCREMENT-AGE":
            return {
                ...state,
                age: state.age + 1
            }
        case "INCREMENT-CHILDREN-COUNT":
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case "CHANGE-USER-NAME":
            return {
                ...state,
                name: action.newUserName
            }
        default:
            throw new Error("I don't understand this action type")
    }
}