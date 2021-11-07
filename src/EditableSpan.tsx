import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    setNewItemTitleHandler: (newTaskTitle: string) => void
}
export const EditableSpan = React.memo(({title, setNewItemTitleHandler}: EditableSpanPropsType) => {
    console.log("EditableSpan rendered")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>(title)
    const correctTask = (event: ChangeEvent<HTMLInputElement>) => {
        let newTaskTitle = event.currentTarget.value;
        setTaskTitle(newTaskTitle)
        setNewItemTitleHandler(newTaskTitle)
    }
    const onBlurHandler = () => setEditMode(false)
    return (
        <span>
            {editMode &&
            <TextField multiline variant={"standard"} onChange={correctTask} value={taskTitle} autoFocus
                       onBlur={onBlurHandler}/>}
            {editMode || <span style={{wordWrap: "break-word"}}
                               onDoubleClick={() => setEditMode(true)}>{taskTitle}</span>}
        </span>
    )
})