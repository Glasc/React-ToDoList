import { Button, IconButton } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import React from 'react'
import styles from './Todo.module.css'
import { Item } from './Item'

interface TodoProps {}

export const Todo: React.FC<TodoProps> = ({}) => {
  return (
    <div className={styles.todoContainer}>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        THINGS TO DO
      </h1>
      <form onSubmit={(e) => e.preventDefault}>
        <Input
          placeholder='Add New'
          variant='outline'
          bg={'#171923'}
          focusBorderColor='#B83280'
          border='none'
          marginTop='1em'
          marginBottom='1em'
        />
      </form>
      <div className={styles.itemsContainer}>
        <Item isChecked={true} itemText='Item 1...' styles={styles} />
        <Item isChecked={true} itemText='Item 2...' styles={styles} />
        <Item isChecked={true} itemText='Item 3...' styles={styles} />
      </div>
      <footer className={styles.buttonContainer}>
        <section className={styles.leftSection}>
          <IconButton
            icon={<SearchIcon />}
            aria-label=''
            size='sm'
            variant='outline'
            color='black'
          />
          <IconButton
            icon={<AddIcon />}
            aria-label=''
            size='sm'
            variant='outline'
            color='black'
          />
          <span className={styles.span}>| 3 items left</span>
        </section>
        <section className={styles.rightSection}>
          <Button size='sm' colorScheme='pink' variant='ghost'>
            All
          </Button>
          <Button size='sm' colorScheme='pink' variant='ghost'>
            Active
          </Button>
          <Button size='sm' colorScheme='pink' variant='ghost'>
            Complete
          </Button>
        </section>
      </footer>
    </div>
  )
}
