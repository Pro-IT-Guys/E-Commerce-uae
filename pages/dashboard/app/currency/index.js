import { Container, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import DashboardLayout from 'src/layouts/dashboard'

export default function CurrencyUpdate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }
  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <h1 className="text-2xl font-semibold mb-3">Update Currency</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-5 shadow rounded sm:flex items-center gap-5">
            <div className="flex flex-col items-start sm:w-[60%]">
              <TextField
                fullWidth
                label="Dollar Rate"
                placeholder=" 1 AED = 0.27 USD"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  type: 'number',
                }}
                {...register('currency', {
                  required: {
                    value: true,
                    message: 'Currency is Required',
                  },
                })}
              />
              <label className="Currency">
                {errors.currency?.type === 'required' && (
                  <span className="pl-2 text-xs mt-1 text-red-500">
                    {errors.currency.message}
                  </span>
                )}
              </label>
            </div>

            <div className='sm:w-[40%] mt-5 sm:mt-0'>
              <button
                type="submit"
                className="bg-secondary hover:bg-secondaryHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Update
              </button>
            </div>
          </div>

          <div className="mt-4 ml-5">
            <h1 className="font-semibold ">Your Currency Rate </h1>
            <p className="text-[#4e4e4e] text-sm">
              1 AED ={' '}
              <span className="text-secondary font-semibold"> 0.27 USD</span>
            </p>
          </div>
        </form>
      </Container>
    </DashboardLayout>
  )
}
