import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FetchUrls from '../../utils/FetchUrls'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'

// ----------------------------------------------------------------------

export default function SignUpForm({ onClose }) {
  const [otpModal, setOtpModal] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async data => {
    const { firstName, lastName, email, password } = data

    const body = {
      name: { firstName, lastName },
      email,
      password,
      role: 'user',
    }

    axios
      .post(FetchUrls('auth'), body)
      .then(res => {
        if (res.status === 200) {
          setOtpModal(true)
          setOtpEmail(email)
          toast.success('Otp sent Successfully! Please Verify Your Email')
          localStorage.setItem(
            'user',
            JSON.stringify(res.headers.authorization.split(' ')[1]),
          )
        } else {
          toast.error('User Already Exist! ')
        }
      })
      .catch(err => {
      })
  }

  const submitOtp = async data => {
    const { otp } = data

    const body = {
      email: otpEmail,
      verificationCode: otp,
    }
    console.log(body)
    axios
      .post(FetchUrls('auth/verify'), body)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setOtpModal(true)
          onClose()
          toast.success('Email Verified Successfully! Please Login')
          setUpdate(Math.random())
          localStorage.setItem('token', res.headers.authorization.split(' ')[1])
        } else {
          toast.error('Otp does not match! Please Try Again')
        }
      })
      .catch(err => {
        // toast.error('User Already Exist!')
      })
  }

  return (
    <>
      {otpModal && otpEmail ? (
        <>
          <div className="px-10 pb-16 pt-10 border">
            <h1 className="text-xl font-semibold text-center mb-7">
              Otp input Form
            </h1>

            <form onSubmit={handleSubmit(submitOtp)}>
              <div className="flex flex-col items-start ">
                <label htmlFor="otp" className="mb-1">
                  Enter Otp Here
                </label>
                <input
                  className="py-3 px-2 text-gray-500 rounded w-full  border-[1px]"
                  type="number"
                  id="otp"
                  {...register('otp', {
                    required: {
                      value: true,
                      message: 'Otp is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.otp?.type === 'required' && (
                    <span className="pl-3 text-sm mt-1 text-red-500">
                      {errors.otp.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="font-bold  py-3 rounded bg-primary text-white w-full"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="shadow border">
            <CloseIcon
              className="absolute top-2 right-2 cursor-pointer"
              onClick={onClose}
              fontSize="medium"
            />
            <h1 className="text-xl font-bold text-center mt-8">
              Join AYMi Fashion
            </h1>
            <div className="flex justify-center ">
              <div className="w-full  md:px-10 px-5 py-5">
                <div className=" rounded-lg w-full">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                      <div className="sm:flex gap-5 w-full">
                        <div className="flex flex-col items-start sm:w-[50%]">
                          <label htmlFor="firstName" className="">
                            First Name
                          </label>
                          <input
                            className="py-3 px-2 text-gray-500 rounded w-full  border-[1px]"
                            type="firstName"
                            id="firstName"
                            {...register('firstName', {
                              required: {
                                value: true,
                                message: 'First Name is Required',
                              },
                            })}
                          />
                          <label className="label">
                            {errors.firstName?.type === 'required' && (
                              <span className="pl-3 text-sm mt-1 text-red-500">
                                {errors.firstName.message}
                              </span>
                            )}
                          </label>
                        </div>
                        <div className="flex flex-col items-start sm:w-[50%] mt-5 sm:mt-0">
                          <label htmlFor="lastName" className="">
                            Last Name
                          </label>
                          <input
                            className="py-3 px-2 text-gray-500 rounded w-full  border-[1px]"
                            type="lastName"
                            id="lastName"
                            {...register('lastName', {
                              required: {
                                value: true,
                                message: 'Last Name is Required',
                              },
                            })}
                          />
                          <label className="lastName">
                            {errors.lastName?.type === 'required' && (
                              <span className="pl-3 text-sm mt-1 text-red-500">
                                {errors.lastName.message}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <label htmlFor="email" className="">
                          Email
                        </label>
                        <input
                          className="py-3 px-3 text-gray-500 rounded w-full  border-[1px]"
                          type="email"
                          id="email"
                          {...register('email', {
                            required: {
                              value: true,
                              message: 'Email is Required',
                            },
                            pattern: {
                              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                              message: 'Provide a valid Email',
                            },
                          })}
                        />
                        <label className="label">
                          {errors.email?.type === 'required' && (
                            <span className="pl-3 text-sm mt-1 text-red-500">
                              {errors.email.message}
                            </span>
                          )}
                          {errors.email?.type === 'pattern' && (
                            <span className="pl-3 text-sm mt-1 text-red-500">
                              {errors.email.message}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="flex flex-col items-start ">
                        <label htmlFor="password" className="">
                          Password
                        </label>
                        <input
                          type="password"
                          className="py-3 px-3 rounded w-full  border-[1px]"
                          id="password"
                          {...register('password', {
                            required: {
                              value: true,
                              message: 'Password is Required',
                            },
                            minLength: {
                              value: 6,
                              message: 'Must be 6 characters or longer',
                            },
                          })}
                        />
                        <label className="label">
                          {errors.password?.type === 'required' && (
                            <span className="pl-5 text-sm mt-1 text-red-500">
                              {errors.password.message}
                            </span>
                          )}
                          {errors.password?.type === 'minLength' && (
                            <span className="pl-3 text-sm mt-1 text-red-500">
                              {errors.password.message}
                            </span>
                          )}
                          {/* {error && (
                        <span className="pl-5 label-text-alt text-red-500">
                          {errorMsg}
                        </span>
                      )} */}
                        </label>
                      </div>

                      <div className="mt-5">
                        <button
                          type="submit"
                          className="font-bold  py-3 rounded bg-primary text-white w-full"
                        >
                          Sign Up
                        </button>
                      </div>

                      {/* <div>
                    <p className="text-sm text-center pt-3 pb-4">
                      Already have an account?{" "}
                      <span
                        className="text-primary hover:underline cursor-pointer font-bold"
                        onClick={() => router.push("/auth/login")}
                      >
                     Login Now
                      </span>
                    </p>
                  </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
