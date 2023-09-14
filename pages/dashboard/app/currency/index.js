import { Container, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import DashboardLayout from '../../../../src/layouts/dashboard'
import { createCurrency, getCurrency } from '../../../../apis/currency.api'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useContext } from 'react'
import { ContextData } from '../../../../context/dataProviderContext'

export default function CurrencyUpdate() {
  const { rateAEDtoUSD, setRateAEDtoUSD } = useContext(ContextData)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async data => {
    const convertRate = Number(data.currency)
    const response = await createCurrency(convertRate)
    if (response?.success) {
      toast.success(response?.message)
      setRateAEDtoUSD(response?.data?.convertRate)
      reset()
    }
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
                placeholder={`1 AED = ${rateAEDtoUSD} USD`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  type: 'text',
                }}
                {...register('currency', {
                  required: {
                    value: true,
                    message: 'Currency is Required',
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid currency format. Example: 0.27',
                  },
                  validate: value => {
                    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                      return 'Invalid input. Please enter a valid currency format (e.g., 0.27)'
                    }
                    return true
                  },
                })}
              />

              <label className="Currency">
                {errors.currency && (
                  <span className="pl-2 text-xs mt-1 text-red-500">
                    {errors.currency.message}
                  </span>
                )}
              </label>
            </div>

            <div className="sm:w-[40%] mt-5 sm:mt-0">
              <button
                type="submit"
                className="bg-primary hover:bg-secondaryHover text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Update
              </button>
            </div>
          </div>

          <div className="mt-4 ml-5">
            <h1 className="font-semibold ">Your Currency Rate </h1>
            <p className="text-[#4e4e4e] text-sm">
              1 AED ={' '}
              <span className="text-primary font-semibold">
                {' '}
                {rateAEDtoUSD} USD
              </span>
            </p>
          </div>
        </form>
      </Container>
    </DashboardLayout>
  )
}
