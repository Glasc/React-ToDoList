import React from 'react'
import styles from './Items.module.css'
import { useAppSelector } from '../../../store/hooks'
import { selectItems } from '../todoSlice'
import { ItemInterface } from '../../../shared/types';
import { Item } from '../../Item';

interface ItemsProps {}

export const Items: React.FC<ItemsProps> = ({}) => {
  const items = useAppSelector(selectItems)

  return (
    <div className={styles.itemsContainer}>
      {/* <Item isChecked={true} itemText='Item 1...' styles={styles} />
        <Item isChecked={true} itemText='Item 2...' styles={styles} />
        <Item isChecked={true} itemText='Item 3...' styles={styles} /> */}
      {items.map((item: ItemInterface) => {
        return (
          <Item
            id={item.id}
            key={item.id}
            isChecked={item.isChecked}
            text={item.text}
          />
        )
      })}
    </div>
  )
}
