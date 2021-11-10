import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
    }
}

export const todolistsApi = {
    getTodolist: () => {
        return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    createTodolist: () => {
        return axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: "New todolist, which was created right"},
            settings
        )
    },
    deleteTodolistId: " ",
    deleteTodolist: () => {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/46c06d7d-36be-45eb-9b0c-1ce77a0220b3`,
            settings
        )
    },
    updateTodolistTitle: () => {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/27018d86-550c-44cc-af63-bfded8ccccfc`,
            {title: "Updated title YAER YAEH"},
            settings
        )
    },
}