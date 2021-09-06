import React from 'react'
import { Checkbox } from '@chakra-ui/checkbox'
import { IconButton } from '@chakra-ui/button'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import styles from './Item.module.css'
import { useAppDispatch } from '../store/hooks'
import { checkItem } from './Todo/todoSlice'

interface ItemProps {
  id: number
  isChecked: boolean
  itemText: string
  styles?: { [key: string]: string }
}

export const Item: React.FC<ItemProps> = ({
  id,
  isChecked,
  itemText: text,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.item}>
      <Checkbox
        marginTop='0.3em'
        marginBottom='0.3em'
        isChecked={isChecked}
        onChange={() =>
          dispatch(checkItem({ id, isChecked, text }))
        }
      >
        <span className={isChecked ? styles.itemChecked : ''}>
          {text}
        </span>
      </Checkbox>
      <div className={styles.itemIcons}>
        <IconButton
          icon={<EditIcon />}
          aria-label=''
          size='sm'
          variant='outline'
          colorScheme='yellow'
        />
        <IconButton
          icon={<DeleteIcon />}
          aria-label=''
          size='sm'
          variant='outline'
          colorScheme='pink'
        />
      </div>
    </div>
  )
}
