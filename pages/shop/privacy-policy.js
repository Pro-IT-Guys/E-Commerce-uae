import { Container } from '@mui/material'
import { BASE_URL } from 'apis/url'
import React, { useEffect, useState } from 'react'
import MainLayout from 'src/layouts/main'

export default function PrivacyPolicy() {
  const [privacy, setPrivacy] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/privacy-policy`)
      .then(res => res.json())
      .then(data => setPrivacy(data.data.content))
      .catch(err => console.log(err))
  }, [])

  return (
    <MainLayout>
      <Container maxWidth="lg" className='min-h-[80vh]'>
        <h1 className='mt-40 text-2xl font-semibold mb-5'>Privacy Policy</h1>

        <div className="bg-white p-5 rounded  shadow mb-5">
          <div
            className="pb-3 pt-5 text-justify imgUrl"
            dangerouslySetInnerHTML={{ __html: privacy }}
          ></div>
        </div>
      </Container>
    </MainLayout>
  )
}
