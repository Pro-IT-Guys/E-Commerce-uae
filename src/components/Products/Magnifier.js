import React, { useState, useRef } from 'react'
import { styled } from '@mui/material/styles'

const MagnifierWrapper = styled('div')({
  position: 'absolute',
  zIndex: 999,
  pointerEvents: 'none',
})

const MagnifierImage = styled('img')({
  width: '200px', // Adjust the magnifier size as needed
  height: 'auto',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
})

const Magnifier = ({ src, offsetX, offsetY }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const magnifierRef = useRef(null)

  const handleMouseMove = e => {
    const { clientX, clientY } = e
    const rect = magnifierRef.current.getBoundingClientRect()
    const top = clientY - rect.height / 2 - offsetY
    const left = clientX - rect.width / 2 - offsetX
    setPosition({ top, left })
  }

  return (
    <MagnifierWrapper
      ref={magnifierRef}
      style={{ top: position.top, left: position.left }}
      onMouseMove={handleMouseMove}
    >
      <MagnifierImage src={src} alt="Magnified View" />
    </MagnifierWrapper>
  )
}

export default Magnifier
