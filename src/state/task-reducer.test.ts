import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    StatusChangeAC,
    TaskPriorities,
    taskReducer,
    TaskStatuses
} from "./task-reducer";
import {TasksType} from "../AppWithReducers";

test("task in correct todolist should be remove", () => {

    const TodolistID1 = "11";
    const TodolistID2 = "22";

    const startState: TasksType = {
        [TodolistID1]: [{
            id: "0",
            title: "HTML1",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID1,
            order: 0,
            addedDate: "",
        },
            {
                id: "1",
                title: "HTML2",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },
            {
                id: "2",
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
                title: "HTML6",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },],
    }

    const endState = taskReducer(startState, RemoveTaskAC(TodolistID1, "0"))

    expect(endState[TodolistID1][0]).toBe(startState[TodolistID1][1])
    expect(endState[TodolistID1][0].title).toBe("HTML2")
    expect(endState).toEqual({
        [TodolistID1]: [
            {
                id: "1",
                title: "HTML2",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },
            {
                id: "2",
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
                title: "HTML6",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },],
    })
})

test("add new task in correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TasksType = {
        [TodolistID1]: [{
            id: v1(),
            title: "HTML1",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID1,
            order: 0,
            addedDate: "",
        },
            {
                id: v1(),
                title: "HTML2",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: v1(),
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: v1(),
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "HTML6",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },],
    }

    const endState = taskReducer(startState, AddTaskAC(TodolistID2, "NewTestTask"))

    expect(endState[TodolistID2].length).toBe(4)
    expect(endState[TodolistID2][0].title).toBe("NewTestTask")
    expect(endState[TodolistID2][1].title).toBe("HTML4")
    expect(endState[TodolistID2][2].title).toBe("HTML5")
    expect(endState[TodolistID2][3].title).toBe("HTML6")
})

test("change checkbox in correct task of correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TasksType = {
        [TodolistID1]: [{
            id: v1(),
            title: "HTML1",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID1,
            order: 0,
            addedDate: "",
        },
            {
                id: v1(),
                title: "HTML2",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: v1(),
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: v1(),
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "HTML6",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },],
    }

    const endState = taskReducer(startState,
        StatusChangeAC(TodolistID1, startState[TodolistID1][2].id))

    expect(endState[TodolistID1][2].status).toBe(TaskStatuses.Completed)
    expect(endState).not.toBe(startState)
})

test("change tasks title in correct todolist", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startState: TasksType = {
        [TodolistID1]: [{
            id: v1(),
            title: "HTML1",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID1,
            order: 0,
            addedDate: "",
        },
            {
                id: v1(),
                title: "HTML2",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: v1(),
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: v1(),
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: v1(),
                title: "HTML6",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },],
    }

    const endState = taskReducer(startState,
        ChangeTaskTitleAC(TodolistID1, startState[TodolistID1][0].id, "NewTestTitle"))

    expect(endState[TodolistID1][0].title).toBe("NewTestTitle")
    expect(endState).not.toBe(startState)
})


