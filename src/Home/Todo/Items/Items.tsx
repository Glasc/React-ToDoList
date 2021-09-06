import React, { useEffect, useState } from 'react'
import styles from './Items.module.css'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  selectItems,
  selectCustomItems,
  showAllItems,
} from '../todoSlice'
import { ItemInterface, modeType } from '../../../shared/types'
import { Item } from './Item'

interface ItemsProps {}

export const Items: React.FC<ItemsProps> = ({}) => {
  const items = useAppSelector(selectItems)
  const customItems: ItemInterface[] =
    useAppSelector(selectCustomItems)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(showAllItems())
  }, [items, dispatch])

  return (
    <div className={styles.itemsContainer}>
      {customItems.map((item: ItemInterface) => {
        return (
          <Item
            id={item.id}
            key={item.id}
            isChecked={item.isChecked}
            isEditing={item.isEditing}
            text={item.text}
          />
        )
      })}
    </div>
  )
}
