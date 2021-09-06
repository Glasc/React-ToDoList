export interface ItemInterface {
  id: number
  text: string
  isChecked: boolean
  isEditing: boolean
}

export type modeType = 'All' | 'Active' | 'Complete' | 'Filter'