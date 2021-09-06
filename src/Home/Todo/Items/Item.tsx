import React, { useRef, useState, useEffect } from 'react'
import { Checkbox } from '@chakra-ui/checkbox'
import { IconButton } from '@chakra-ui/button'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import styles from './Item.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  checkItem,
  deleteItem,
  toggleEdit,
  updateItem,
} from '../todoSlice'
import { ItemInterface, modeType } from '../../../shared/types'
import { Input } from '@chakra-ui/input'
import { selectIsSearching } from '../todoSlice';

export const Item: React.FC<ItemInterface> = ({
  id,
  isChecked,
  isEditing,
  text,
}) => {
  const dispatch = useAppDispatch()

  const isSearching: boolean = useAppSelector(selectIsSearching)

  const editRef = useRef<any>(null)

  const [editing, setEditing] = useState<string>(text)

  const handleDelete = (): void => {
    dispatch(deleteItem({ id }))
  }

  const handleEditClick = (): void => {
    dispatch(toggleEdit({ id }))
    dispatch(updateItem({ id, newText: editing }))
  }

  const handleEditingChange = (e: any): void => {
    setEditing(e.target.value)
  }

  const handleEditingSubmit = (e: any): void => {
    e.preventDefault()
    dispatch(toggleEdit({ id }))
    dispatch(updateItem({ id, newText: editing }))
  }

  useEffect(() => {
    if (isEditing) {
      editRef.current.focus()
    } 
  }, [isEditing])

  return (
    <div className={styles.item}>
      {isEditing ? (
        <form
          style={{ width: '100%' }}
          onSubmit={handleEditingSubmit}
        >
          <Input
            ref={editRef}
            variant='flushed'
            width='90%'
            value={editing}
            onChange={handleEditingChange}
          />
        </form>
      ) : (
        <Checkbox
          marginTop='0.3em'
          marginBottom='0.3em'
          isChecked={isChecked}
          onChange={() => dispatch(checkItem({ id }))}
        >
          <span className={isChecked ? styles.itemChecked : ''}>
            {text}
          </span>
        </Checkbox>
      )}
      <div className={styles.itemIcons}>
        <IconButton
          icon={<EditIcon />}
          aria-label=''
          isDisabled={isSearching}
          size='sm'
          variant='outline'
          colorScheme='yellow'
          onClick={handleEditClick}
        />
        <IconButton
          icon={<DeleteIcon />}
          aria-label=''
          size='sm'
          variant='outline'
          colorScheme='pink'
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}
