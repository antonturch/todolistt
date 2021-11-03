import {v1} from "uuid";
import {TodolistType} from "../AppWithReducers";
import {RemoveTodolistAC, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

test("add/delete correct file stryctyre in tasks and todolists", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startTodolistState: TodolistType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all"},
        {id: TodolistID2, title: "What to buy", filter: "all"},
    ]

    const startTasksState = {
        [TodolistID1]: [{id: "1", title: "HTML", isDone: true,},
            {id: "2", title: "CSS", isDone: false,},
            {id: "3", title: "JS", isDone: false,},],
        [TodolistID2]: [{id: "1", title: "React", isDone: true,},
            {id: "2", title: "Material UI", isDone: false,},
            {id: "3", title: "Redux", isDone: false,},],
    }

    const endTodolistState = todolistReducer(startTodolistState, RemoveTodolistAC(TodolistID1))
    const endTasksState = taskReducer(startTasksState, RemoveTodolistAC(TodolistID1))

    expect(endTodolistState.length).toBe(1)
    expect(endTodolistState[0].id).toBe(TodolistID2)

    expect(endTasksState).toEqual({
        [TodolistID2]: [{id: "1", title: "React", isDone: true,},
            {id: "2", title: "Material UI", isDone: false,},
            {id: "3", title: "Redux", isDone: false,},],
    })
})