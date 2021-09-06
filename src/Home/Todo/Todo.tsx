import React, { ChangeEvent, useState } from 'react'
import { Input } from '@chakra-ui/input'
import styles from './Todo.module.css'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addItem, selectItems } from './todoSlice'
import { Items } from './Items/Items'
import { H1 } from '../ui/H1'
import { BottomNav } from './BottomNav/BottomNav'
import { modeType } from '../../shared/types'

interface TodoProps {}

export const Todo: React.FC<TodoProps> = ({}) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectItems)

  const [inputText, setInputText] = useState<string>('')

  const handleInputTextChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (inputText && inputText.length > 5) {
      dispatch(
        addItem({
          id: parseInt(new Date().getTime().toString()),
          text: inputText,
        })
      )
      setInputText('')
    }
  }

  return (
    <div className={styles.todoContainer}>
      <H1>THINGS TO DO</H1>
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
