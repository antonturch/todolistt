import {v1} from "uuid";
import {AddTaskAC, ChangeTaskTitleAC, CheckboxChangeAC, RemoveTaskAC, taskReducer} from "./task-reducer";

test("task in correct todolist should be remove", () => {

    const TodolistID1 = "11";
    const TodolistID2 = "22";

    const startState = {
        [TodolistID1]: [{id: "0", title: "HTML", isDone: true,},
            {id: "1", title: "CSS", isDone: false,},
            {id: "2", title: "JS", isDone: false,},],
        [TodolistID2]: [{id: "0", title: "React", isDone: true,},
            {id: "1", title: "Material UI", isDone: false,},
            {id: "2", title: "Redux", isDone: false,},],
    }

    const endState = taskReducer(startState, RemoveTaskAC(TodolistID1, "0"))

    expect(endState[TodolistID1][0]).toBe(startState[TodolistID1][1])
    expect(endState[TodolistID1][0].title).toBe("CSS")
    expect(endState).toEqual({
        [TodolistID1]: [{id: "1", title: "CSS", isDone: false,},
            {id: "2", title: "JS", isDone: false,},],
        [TodolistID2]: [{id: "0", title: "React", isDone: true,},
            {id: "1", title: "Material UI", isDone: false,},
            {id: "2", title: "Redux", isDone: false,},],
    })
})

test("add new task in correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState = {
        [TodolistID1]: [{id: v1(), title: "HTML", isDone: true,},
            {id: v1(), title: "CSS", isDone: false,},
            {id: v1(), title: "JS", isDone: false,},],
        [TodolistID2]: [{id: v1(), title: "React", isDone: true,},
            {id: v1(), title: "Material UI", isDone: false,},
            {id: v1(), title: "Redux", isDone: false,},],
    }

    const endState = taskReducer(startState, AddTaskAC(TodolistID2, "NewTestTask"))

    expect(endState[TodolistID2].length).toBe(4)
    expect(endState[TodolistID2][0].title).toBe("NewTestTask")
    expect(endState[TodolistID2][1].title).toBe("React")
    expect(endState[TodolistID2][2].title).toBe("Material UI")
    expect(endState[TodolistID2][3].title).toBe("Redux")
})

test("change checkbox in correct task of correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState = {
        [TodolistID1]: [{id: v1(), title: "HTML", isDone: true,},
            {id: v1(), title: "CSS", isDone: false,},
            {id: v1(), title: "JS", isDone: false,},],
        [TodolistID2]: [{id: v1(), title: "React", isDone: true,},
            {id: v1(), title: "Material UI", isDone: false,},
            {id: v1(), title: "Redux", isDone: false,},],
    }

    const endState = taskReducer(startState,
        CheckboxChangeAC(TodolistID1, startState[TodolistID1][2].id))

    expect(endState[TodolistID1][2].isDone).toBe(true)
    expect(endState).not.toBe(startState)
})

test("change tasks title in correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState = {
        [TodolistID1]: [{id: v1(), title: "HTML", isDone: true,},
            {id: v1(), title: "CSS", isDone: false,},
            {id: v1(), title: "JS", isDone: false,},],
        [TodolistID2]: [{id: v1(), title: "React", isDone: true,},
            {id: v1(), title: "Material UI", isDone: false,},
            {id: v1(), title: "Redux", isDone: false,},],
    }

    const endState = taskReducer(startState,
        ChangeTaskTitleAC(TodolistID1, startState[TodolistID1][0].id, "NewTestTitle"))

    expect(endState[TodolistID1][0].title).toBe("NewTestTitle")
    expect(endState).not.toBe(startState)
})

test("change tasks title in correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState = {
        [TodolistID1]: [{id: v1(), title: "HTML", isDone: true,},
            {id: v1(), title: "CSS", isDone: false,},
            {id: v1(), title: "JS", isDone: false,},],
        [TodolistID2]: [{id: v1(), title: "React", isDone: true,},
            {id: v1(), title: "Material UI", isDone: false,},
            {id: v1(), title: "Redux", isDone: false,},],
    }

    const endState = taskReducer(startState,
        ChangeTaskTitleAC(TodolistID1, startState[TodolistID1][0].id, "NewTestTitle"))

    expect(endState[TodolistID1][0].title).toBe("NewTestTitle")
    expect(endState).not.toBe(startState)
})

