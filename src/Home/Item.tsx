import React from 'react'
import { Checkbox } from '@chakra-ui/checkbox'
import { IconButton } from '@chakra-ui/button'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import styles from './Item.module.css'

interface ItemProps {
  isChecked: boolean
  itemText: string
  styles?: { [key: string]: string }
}

export const Item: React.FC<ItemProps> = ({
  isChecked,
  itemText,
}) => {
  return (
    <div className={styles.item}>
      <Checkbox
        marginTop='0.3em'
        marginBottom='0.3em'
        isChecked={isChecked}
      >
        <span className={isChecked ? styles.itemChecked : ''}>
          {itemText}
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
