import {Provider} from "react-redux";
import {store} from "./app/store";

// const TodolistID1 = v1();
// const TodolistID2 = v1();
//
// const rootReducers = combineReducers({
//     todolists: todolistReducer,
//     tasks: taskReducer
// })

// const initGlobalState = {
//     todolists: [
//         {id: TodolistID1, title: "What to learn", filter: "all"},
//         {id: TodolistID2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//         [TodolistID1]: [{id: v1(), title: "HTML", isDone: true,},
//             {id: v1(), title: "CSS", isDone: false,},
//             {id: v1(), title: "JS", isDone: false,},],
//         [TodolistID2]: [{id: v1(), title: "React", isDone: true,},
//             {id: v1(), title: "Material UI", isDone: false,},
//             {id: v1(), title: "Redux", isDone: false,},],
//     },
// }
//
// const storeForStorybook = createStore(rootReducers, initGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return (
      <Provider store={store}>
        {storyFn()}
      </Provider>
  )
}