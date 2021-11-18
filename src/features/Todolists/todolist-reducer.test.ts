import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    SetTodolistAC,
    TodolistEntityType,
    todolistReducer
} from "./todolist-reducer";

const TodolistID1 = v1();
const TodolistID2 = v1();

test("correct todolist should be removed", () => {

    const startState: TodolistEntityType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: TodolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0,},
    ]

    const endState = todolistReducer(startState, RemoveTodolistAC(TodolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(TodolistID2);
})

test("add new todolist", () => {

    const startState: TodolistEntityType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: TodolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0,},
    ]

    const endState = todolistReducer(startState, AddTodolistAC("testTitle"))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("testTitle");
    expect(startState).not.toBe(endState);
})

test("correct todolist should change his title", () => {

    const startState: TodolistEntityType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: TodolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0,},
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
    expect(startState[1]).toBe(endState[1]);
    expect(startState[0]).not.toBe(endState[0]);
})

test("correct todolist should change filter", () => {

    const startState: TodolistEntityType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: TodolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0,},
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
    expect(startState[1]).toBe(endState[1]);
    expect(startState[0]).not.toBe(endState[0]);
})

test("tasks from API should be set to REDUX state", () => {

    const endState = todolistReducer([],
        SetTodolistAC(
            [{id: TodolistID1, title: "What to learn", addedDate: "", order: 0,},
                {id: TodolistID2, title: "What to buy", addedDate: "", order: 0,},
                {id: "13", title: "I'am setted from API", addedDate: "", order: 0,}]))

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe("13")
})