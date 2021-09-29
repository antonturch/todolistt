import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test("correct todolist should be removed", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TodolistType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all"},
        {id: TodolistID2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startState, RemoveTodolistAC(TodolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(TodolistID2);
})

test("add new todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TodolistType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all"},
        {id: TodolistID2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startState, AddTodolistAC("testTitle"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("testTitle");
    expect(startState).not.toBe(endState);
})

test("correct todolist should change his title", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TodolistType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all"},
        {id: TodolistID2, title: "What to buy", filter: "all"},
    ]

    // const action: ChangeTodolistTitleActionType = {
    //     type: "CHANGE-TODOLIST-TITLE",
    //     todolistId: TodolistID1,
    //     newTodolistTitle: "changedTitle"
    // }

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(TodolistID1, "changedTitle"))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("changedTitle");
    expect(startState).not.toBe(endState);
    expect(startState[0]).toBe(endState[0]);
})

test("correct todolist should change filter", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TodolistType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all"},
        {id: TodolistID2, title: "What to buy", filter: "all"},
    ]

    // const action: ChangeTodolistFilterActionType = {
    //     type: "CHANGE-TODOLIST-FILTER",
    //     todolistId: TodolistID1,
    //     newTodolistFilter: "active"
    // }

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(TodolistID1, "active"))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("active");
    expect(startState).not.toBe(endState);
    expect(startState[0]).toBe(endState[0]);
})