import { Container } from '@mui/material'
import { BASE_URL } from 'apis/url'
import React, { useEffect, useState } from 'react'
import MainLayout from 'src/layouts/main'

export default function ReturnPolicy() {
  const [returnPolicy, setReturnPolicy] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/return-policy`)
      .then(res => res.json())
      .then(data => setReturnPolicy(data.data.content))
      .catch(err => console.log(err))
  }, [])

  return (
    <MainLayout>
      <Container maxWidth="lg" className='min-h-[80vh]'>
        <h1 className='mt-40 text-2xl font-semibold mb-5'>Return and Refund Policy</h1>

        <div className="bg-white p-5 rounded  shadow mb-5 ">
          <div
            className="pb-3 pt-5 text-justify imgUrl"
            dangerouslySetInnerHTML={{ __html: returnPolicy }}
          ></div>
        </div>
      </Container>
    </MainLayout>
  )
}
