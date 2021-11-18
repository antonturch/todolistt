import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../features/Todolists/task-reducer";
import {todolistReducer} from "../features/Todolists/todolist-reducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))



// @ts-ignore
window.store = store