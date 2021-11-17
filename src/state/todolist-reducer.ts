import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type FilterType = "all" | "active" | "completed";

export type TodolistEntityType = TodolistType & {
    filter: FilterType
}

export type ActionsType =
    ReturnType<typeof SetTodolistAC> |
    ReturnType<typeof RemoveTodolistAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof ChangeTodolistTitleAC> |
    ReturnType<typeof ChangeTodolistFilterAC>


export const SetTodolistAC = (todolists: TodolistType[]) => ({
    type: "SET-TODOLISTS",
    todolists
} as const)

export const RemoveTodolistAC = (todolistId: string) => ({
    type: "REMOVE-TODOLIST",
    todolistId
} as const)
export const AddTodolistAC = (newTodolistTitle: string) => ({
    type: "ADD-TODOLIST",
    todolistId: v1(),
    newTodolistTitle
} as const)
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    newTodolistTitle
} as const)
export const ChangeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    newTodolistFilter
} as const)

export const TodolistID1 = v1();
export const TodolistID2 = v1();
export const initialState: TodolistEntityType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [{
                id: action.todolistId,
                title: action.newTodolistTitle,
                filter: "all",
                addedDate: "",
                order: 0,
            }, ...state]
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
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({
                ...el,
                filter: "all"
            }))
        default:
            return state
    }
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolist()
            .then((res) => {
                dispatch(SetTodolistAC(res.data))
            })
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                todolistsApi.getTodolist()
                    .then((res) => {
                        dispatch(SetTodolistAC(res.data))
                    })
            })
    }
}

export const createTodolistTC = (todolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(todolistTitle)
            .then(res => {
                todolistsApi.getTodolist()
                    .then((res) => {
                        dispatch(SetTodolistAC(res.data))
                    })
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, newTodolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.updateTodolistTitle(todolistId, newTodolistTitle)
            .then(res => {
                todolistsApi.getTodolist()
                    .then((res) => {
                        dispatch(SetTodolistAC(res.data))
                    })
            })
    }
}