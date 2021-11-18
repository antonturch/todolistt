import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../../app/App.css";

export type AddItemPropsType = {
    addNewItem: (newItemText: string) => void
}
export const AddItemForm = React.memo(({addNewItem}: AddItemPropsType) => {
    console.log("AddItemForm rendered")
    const [error, setError] = useState<boolean>(false)
    const [newItemText, setNewItemText] = useState<string>("")

    const addNewText = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewItemText(event.currentTarget.value)
    }

    const addNewItemHandler = () => {
        newItemText.trim() ? addNewItem(newItemText) : setError(true)
        setNewItemText("")
    }
    const addNewItemWithEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (newItemText.trim()) {
            if (event.charCode === 13) {
                addNewItem(newItemText)
                setNewItemText("")
            }
        } else setError(true)
    }

    return (
        <div>
            <TextField size={"small"} id="outlined-basic" label="New task" variant="outlined"
                       className={error ? "error" : ""}
                       value={newItemText} onChange={addNewText}
                       onKeyPress={addNewItemWithEnter} error={error}
                       helperText={error ? "title is required" : ""}/>
            <Button size={"large"} variant={"contained"} onClick={addNewItemHandler}>+</Button>
        </div>
    )
})