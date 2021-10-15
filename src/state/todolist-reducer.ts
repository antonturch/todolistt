import {FilterType, TodolistType} from "../App";
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
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    newTodolistTitle
})
export const ChangeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterType): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    newTodolistFilter
})

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.newTodolistTitle, filter: "all"}]
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
            throw new Error("I don't understand this action type")
    }
}