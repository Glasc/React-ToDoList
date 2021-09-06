import { RootState } from '../../store/store'
import { ItemInterface } from '../../shared/types'
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit'
import { stat } from 'fs'

interface todoState {
  mode: 'adding' | 'editing'
  items: ItemInterface[]
}

const lol = {
  2121: {
    name: 'cesar',
  },
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
    addReducer: (state, action: PayloadAction<number>) => {},
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
    addItem: (state, action: PayloadAction<ItemInterface>) => {
      const { id, text, isChecked } = action.payload
      state.items.push({ id, text, isChecked })
    },
  },
})

export const { addReducer, checkItem, addItem } = todoSlice.actions

export const selectItems = (state: RootState) => state.todo.items
export const selectMode = (state: RootState) => state.todo.mode

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectTodos = (state: RootState) => state.todo.items

export default todoSlice.reducer
