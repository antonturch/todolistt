import {FilterType, TodolistType} from "../AppWithReducers";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolistId: string
    newTodolistTitle: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    newTodolistTitle: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    newTodolistFilter: FilterType
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    todolistId
})
export const AddTodolistAC = (newTodolistTitle: string, todolistId: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    todolistId,
    newTodolistTitle
})
export const ChangeTodolistTitleAC = (todolistId: string,
                                      newTodolistTitle: string): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    newTodolistTitle
})
export const ChangeTodolistFilterAC = (todolistId: string,
                                       newTodolistFilter: FilterType): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    newTodolistFilter
})

export const TodolistID1 = v1();
export const TodolistID2 = v1();
export const initialState: TodolistType[] = [
    {id: TodolistID1, title: "What to learn", filter: "all"},
    {id: TodolistID2, title: "What to buy", filter: "all"},
]

export const todolistReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.newTodolistTitle, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            const todolistForNewTitle = state.find(el => el.id === action.todolistId)
            if (todolistForNewTitle) {
                todolistForNewTitle.title = action.newTodolistTitle
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            const todolistForNewFilter = state.find(el => el.id === action.todolistId)
            if (todolistForNewFilter) {
                todolistForNewFilter.filter = action.newTodolistFilter
            }
            return [...state]
        default:
            return state
    }
}