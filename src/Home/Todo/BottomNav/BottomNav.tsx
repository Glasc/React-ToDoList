import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/button'
import styles from './BottomNav.module.css'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  selectItems,
  showActiveItems,
  showAllItems,
  showCompleteItems,
  selectCustomItems,
  selectIsSearching,
  toggleIsSearching,
  searchItems,
} from '../todoSlice'
import { ItemInterface } from '../../../shared/types'
import { Input } from '@chakra-ui/input'

interface BottomNavProps {}

export const BottomNav: React.FC<BottomNavProps> = ({}) => {
  const items: ItemInterface[] = useAppSelector(selectItems)
  const customItems: ItemInterface[] =
    useAppSelector(selectCustomItems)

  const [searchInput, setSearchInput] = useState<string>('')

  const isSearching = useAppSelector(selectIsSearching)

  const dispatch = useAppDispatch()

  const handleAll = (): void => {
    dispatch(showAllItems())
  }
  const handleActive = (): void => {
    dispatch(showActiveItems())
  }

  const handleComplete = (): void => {
    dispatch(showCompleteItems())
  }

  const handleSearch = (): void => {
    dispatch(toggleIsSearching())
  }

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    dispatch(searchItems({ word: searchInput }))
  }, [searchInput, dispatch])

  return (
    <footer className={styles.buttonContainer}>
      <section className={styles.leftSection}>
        <IconButton
          icon={<SearchIcon />}
          aria-label=''
          size='sm'
          variant='outline'
          color='black'
          onClick={handleSearch}
        />

        {isSearching ? (
          <form style={{ width: '100%' }}>
            <Input
              variant='flushed'
              color='black'
              bg='pink.100'
              paddingLeft='9px'
              value={searchInput}
              onChange={handleSearchInput}
            />
          </form>
        ) : (
          <span className={styles.span}>
            | {customItems.length} items left
          </span>
        )}
      </section>
      <section className={styles.rightSection}>
        <Button
          size='sm'
          colorScheme='pink'
          variant='ghost'
          onClick={handleAll}
        >
          All
        </Button>
        <Button
          size='sm'
          colorScheme='pink'
          variant='ghost'
          onClick={handleActive}
        >
          Active
        </Button>
        <Button
          size='sm'
          colorScheme='pink'
          variant='ghost'
          onClick={handleComplete}
        >
          Complete
        </Button>
      </section>
    </footer>
  )
}
