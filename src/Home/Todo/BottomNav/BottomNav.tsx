import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowBackIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons'
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
  restoreEditing,
} from '../todoSlice'
import { ItemInterface } from '../../../shared/types'
import { Input, InputProps } from '@chakra-ui/input'
import { ComponentWithAs } from '@chakra-ui/system'

interface BottomNavProps {}

export const BottomNav: React.FC<BottomNavProps> = React.memo(
  ({}) => {
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
      dispatch(restoreEditing())
    }

    const handleSearchInput = (e: any): void => {
      setSearchInput(e.target.value)
    }

    const handleGoBack = (e: any): void => {
      dispatch(toggleIsSearching())
      dispatch(restoreEditing())
      setSearchInput('')
    }

    const inputRef = useRef<any>(null)

    useEffect(() => {
      dispatch(searchItems({ word: searchInput }))
    }, [searchInput, dispatch])

    useEffect(() => {
      if (isSearching) {
        inputRef.current.focus()

      }
    }, [isSearching])

    return (
      <footer className={styles.buttonContainer}>
        <section className={styles.leftSection}>
          {isSearching ? (
            <IconButton
              icon={<ArrowBackIcon />}
              aria-label=''
              size='sm'
              color='black'
              borderRadius='0'
              onClick={handleGoBack}
            />
          ) : (
            <IconButton
              icon={<SearchIcon />}
              aria-label=''
              size='sm'
              color='black'
              borderRadius='0'
              onClick={handleSearch}
            />
          )}

          {isSearching ? (
            <form style={{ width: '100%' }}>
              <Input
                variant='filled'
                borderRadius='0'
                color='black'
                paddingLeft='9px'
                ref={inputRef}
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
)
