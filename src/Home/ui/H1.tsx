import React from 'react'

interface H1Props {}

export const H1: React.FC<H1Props> = ({ children }) => {
  return (
    <h1
      style={{
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
      }}
    >
      {children}
    </h1>
  )
}
