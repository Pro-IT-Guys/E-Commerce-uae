import { Card, Container } from '@mui/material'
import { BASE_URL } from 'apis/url'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { QuillEditor } from 'src/components/editor'
import DashboardLayout from 'src/layouts/dashboard'
import Swal from 'sweetalert2'

export default function ReturnPolicy() {
  const [content, setContent] = useState('')
  const [update, setUpdate] = useState('')
  const [returnPolicy, setReturnPolicy] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async data => {
    console.log(content)
    const res = await fetch(`${BASE_URL}/return-policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        content,
      }),
    })
    const result = await res.json()
    console.log(result)
    if (result.success) {
      setContent('')
      reset()
      setUpdate(Math.random())
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Return Policy added successfully',
      })
    }
  }

  useEffect(() => {
    fetch(`${BASE_URL}/return-policy`)
      .then(res => res.json())
      .then(data => setReturnPolicy(data.data.content))
      .catch(err => console.log(err))
  }, [update])

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <h1 className="text-2xl font-semibold mb-8">Add Return Policy</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-3">
            <QuillEditor
              className="h-full"
              simple
              value={content}
              onChange={val => setContent(val)}
            />
          </Card>

          <div className="flex justify-start mt-4 ml-3">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>

        <h1 className="mt-10 text-2xl font-semibold mb-3">
          Return Policy Content
        </h1>
        <div className="bg-white p-5 rounded  shadow">
          <div
            className="pb-3 pt-5 text-justify imgUrl"
            dangerouslySetInnerHTML={{ __html: returnPolicy }}
          ></div>
        </div>
      </Container>
    </DashboardLayout>
  )
}
