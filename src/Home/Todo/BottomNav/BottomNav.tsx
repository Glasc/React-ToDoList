import React from 'react'
import { SearchIcon, AddIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/button'
import styles from './BottomNav.module.css'
import { useAppSelector } from '../../../store/hooks';
import { selectItems } from '../todoSlice';

interface BottomNavProps {}

export const BottomNav: React.FC<BottomNavProps> = ({}) => {
  const items = useAppSelector(selectItems)
  return (
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
        <span className={styles.span}>
          | {items.length} items left
        </span>
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
  )
}
