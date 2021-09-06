import { RootState } from '../../store/store'
import { ItemInterface } from '../../shared/types'
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit'

interface todoState {
  mode: 'adding' | 'editing'
  items: ItemInterface[]
}

const initialState: todoState = {
  mode: 'adding',
  items: [
    {
      id: 1442342,
      text: 'hello',
      isChecked: true,
    },
    {
      id: 123212,
      text: 'hello2',
      isChecked: false,
    },
  ],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    checkItem: (state, action: PayloadAction<ItemInterface>) => {
      const { id } = action.payload
      state.items = current(state).items.map(
        (currItem: ItemInterface) => {
          if (currItem.id === id) {
            currItem = { ...currItem, isChecked: !currItem.isChecked }
          }
          return currItem
        }
      )
    },
    addItem: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      const { id, text } = action.payload
      state.items = [
        { id, text, isChecked: false },
        ...current(state).items,
      ]
    },
    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      state.items = current(state).items.filter((currItem) => {
        if (currItem.id !== id) return true
        return false
      })
    },
  },
})

export const { checkItem, addItem, deleteItem } = todoSlice.actions

export const selectItems = (state: RootState) => state.todo.items
export const selectMode = (state: RootState) => state.todo.mode

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectTodos = (state: RootState) => state.todo.items

export default todoSlice.reducer
