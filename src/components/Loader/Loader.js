import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader() {
  return (
      <div className="flex justify-center items-center h-[100vh]">
        <CircularProgress />
      </div>
  )
}

export default Loader
