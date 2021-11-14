import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type FilterType = "all" | "active" | "completed";

export type TodolistEntityType = TodolistType & {
    filter: FilterType
}

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

export type SetTodolistActionType = {
    type: "SET-TODOLISTS"
    todolists: TodolistType[]
}

export type ActionsType =
    SetTodolistActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const SetTodolistAC = (todolists: TodolistType[]): SetTodolistActionType => ({
    type: "SET-TODOLISTS",
    todolists
})

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    todolistId
})
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    todolistId: v1(),
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