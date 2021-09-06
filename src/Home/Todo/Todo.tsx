import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@chakra-ui/input'
import styles from './Todo.module.css'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  addItem,
  loadItems,
  restoreEditing,
  selectItems,
} from './todoSlice'
import { Items } from './Items/Items'
import { H1 } from '../ui/H1'
import { BottomNav } from './BottomNav/BottomNav'
import { modeType, ItemInterface } from '../../shared/types'

interface TodoProps {}

export const Todo: React.FC<TodoProps> = ({}) => {
  const dispatch = useAppDispatch()
  const items: ItemInterface[] = useAppSelector(selectItems)
  const defaultHeadText: string = 'THINGS TO DO'

  const [inputText, setInputText] = useState<string>('')
  const [headText, setHeadText] = useState<string>(defaultHeadText)

  const handleInputTextChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (inputText && inputText.length > 3) {
      dispatch(
        addItem({
          id: parseInt(new Date().getTime().toString()),
          text: inputText,
        })
      )
      setInputText('')
    } else {
      setHeadText('You need more than 3 letters.')
      setTimeout(() => {
        setHeadText(defaultHeadText)
      }, 3000)
    }

    return () => {
      clearTimeout()
    }
  }

  useEffect(() => {
    dispatch(
      loadItems(JSON.parse(localStorage.getItem('items') || '[]'))
    )
    dispatch(restoreEditing())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  return (
    <div className={styles.todoContainer}>
      <H1>{headText}</H1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Add New'
          variant='outline'
          bg={'#171923'}
          focusBorderColor='#B83280'
          border='none'
          marginTop='1em'
          marginBottom='1em'
          onChange={handleInputTextChange}
          value={inputText}
        />
      </form>
      <Items />
      <BottomNav />
    </div>
  )
}
