import { RootState } from '../../store/store'
import { ItemInterface, modeType } from '../../shared/types'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

interface todoState {
  isSearching: boolean
  customItems: ItemInterface[] | []
  items: ItemInterface[]
}

const initialState: todoState = {
  isSearching: false,
  customItems: [],
  items: [
    // {
    //   id: 1442342,
    //   text: 'hello',
    //   isChecked: true,
    //   isEditing: false,
    // },
    // {
    //   id: 123212,
    //   text: 'hello2',
    //   isChecked: false,
    //   isEditing: false,
    // },
  ],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    checkItem: (state, action: PayloadAction<{ id: number }>) => {
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
        { id, text, isChecked: false, isEditing: false },
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
    toggleEdit: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      state.items = current(state).items.map(
        (currItem: ItemInterface) => {
          if (currItem.id === id) {
            currItem = { ...currItem, isEditing: !currItem.isEditing }
          }
          return currItem
        }
      )
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; newText: string }>
    ) => {
      const { id, newText } = action.payload
      state.items = current(state).items.map(
        (currItem: ItemInterface) => {
          if (currItem.id === id) {
            currItem = { ...currItem, text: newText }
          }
          return currItem
        }
      )
    },
    showAllItems: (state) => {
      state.customItems = current(state).items
    },
    showActiveItems: (state) => {
      state.customItems = current(state).items.filter((currItem) => {
        if (!currItem.isChecked) {
          return true
        }
        return false
      })
    },
    showCompleteItems: (state) => {
      state.customItems = current(state).items.filter((currItem) => {
        if (currItem.isChecked) {
          return true
        }
        return false
      })
    },
    searchItems: (state, action: PayloadAction<{ word: string }>) => {
      state.customItems = current(state).items.filter((currItem) => {
        const { word } = action.payload
        if (currItem.text.includes(word)) {
          return true
        }
        return false
      })
    },
    toggleIsSearching: (state) => {
      state.isSearching = !current(state).isSearching
    },
    loadItems: (
      state,
      action: PayloadAction<ItemInterface[] | []>
    ) => {
      state.items = action.payload
    },
    restoreEditing: (state) => {
      state.items = current(state).items.map((currItem) => {
        currItem = { ...currItem, isEditing: false }
        return currItem
      })
    },
  },
})

export const {
  checkItem,
  addItem,
  deleteItem,
  toggleEdit,
  updateItem,
  showAllItems,
  showActiveItems,
  showCompleteItems,
  toggleIsSearching,
  searchItems,
  loadItems,
  restoreEditing,
} = todoSlice.actions

export const selectItems = (state: RootState) => state.todo.items
export const selectCustomItems = (state: RootState) =>
  state.todo.customItems
export const selectIsSearching = (state: RootState) =>
  state.todo.isSearching

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectTodos = (state: RootState) => state.todo.items

export default todoSlice.reducer
