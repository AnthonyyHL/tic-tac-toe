/* eslint-disable react/prop-types */
import React from 'react'

export const Cell = ({ children, isSelected, updateCell, index }) => {
    const className = `cell ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateCell(index)
    }

    return (
        <button className={className} onClick={ handleClick }>
        {children}
        </button>
    )
}