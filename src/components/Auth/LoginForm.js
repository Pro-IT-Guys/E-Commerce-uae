import { useContext, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import FetchUrls from '../../utils/FetchUrls'
import { toast } from 'react-hot-toast'
import { ContextData } from '../../../context/dataProviderContext'
import { set } from 'lodash'

// ----------------------------------------------------------------------

export default function LoginForm({ onClose }) {
  const [forgotPassForm, setForgotPassForm] = useState(false)
  const [otpForm, setOtpForm] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')
  const [resetPassForm, setResetPassForm] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { setUpdate } = useContext(ContextData)

  const onSubmit = data => {
    const { email, password } = data

    const body = {
      email,
      password,
    }

    axios
      .post(FetchUrls('auth/login'), body)
      .then(res => {
        console.log(res)
        if (res.status === 200 && res?.data?.data?.isVerified) {
          // navigate(from, { replace: true })
          onClose()
          setUpdate(Math.random())
          toast.success('Login Successfully!')
          localStorage.setItem('token', res.headers.authorization.split(' ')[1])
          localStorage.setItem('role', res?.data?.data.role)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        } else if (res.status === 200 && !res?.data?.data?.isVerified) {
          toast.error('Please verify your account first!')
        }
        else {
          toast.error('Incorrect Email or Password!')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Incorrect Email or Password!')
      })
  }

  const handleSendOtp = (data) => {
    const { email } = data

    const body = {
      email,
    }
    axios
      .post(FetchUrls('auth/resend_otp'), body)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setForgotPassForm(false)
          setOtpForm(true)
          setOtpEmail(email)
          toast.success('OTP sent successfully!')
        } else {
          toast.error(' User email not found!')
        }
      })
      .catch(err => {
        console.log(err)
        // toast.error('User email not found!')
      })
  }

  const submitOtp = async data => {
    const { otp } = data

    const body = {
      email: otpEmail,
      verificationCode: otp,
    }
    axios
      .post(FetchUrls('auth/verify'), body)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setOtpForm(false)
          setResetPassForm(true)
          toast.success('OTP verified successfully! Now reset your password')
        } else {
          toast.error(' Incorrect OTP!')
        }
      })
      .catch(err => {
        console.log(err.response)
        toast.error('Incorrect OTP!')
      })
  }

  const handleNewPassword = async data => {
    const { password } = data

    const body = {
      email: otpEmail,
      password
    }
    axios
      .post(FetchUrls('auth/reset_password'), body)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setOtpForm(false)
          setResetPassForm(false)
          setForgotPassForm(false)
          toast.success('Password reset successfully! Now login with new password')
        } else {
          toast.error('Password reset failed!')
        }
      })
      .catch(err => {
        console.log(err.response)
        toast.error(' Password reset failed! Try again')
      })
  }


  const handleForgotPassForm = () => {
    setForgotPassForm(true)
  }

  // if (forgotPassForm) {
  //   return (
      
  //   )
  // }



  return (
    <>
    {
      forgotPassForm && (
        <div className="flex justify-center">
        <div className="w-full px-10 pb-10 pt-10 shadow border rounded">
          <div className=" rounded-lg w-full mt-5">
            <form onSubmit={handleSubmit(handleSendOtp)}>
              <div >
                <div className="flex flex-col items-start mb-5">
                  <label htmlFor="email" className="ml-1 mb-1">
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
                <div className="relative mt-5">
                  <button
                    type="submit"
                    className="font-bold  py-3 rounded bg-primary text-white w-full"
                  >
                    Send OTP
                  </button>
                </div>

                <div
                  onClick={() => setForgotPassForm(false)}
                  className="text-sm mt-5 cursor-pointer font-semibold"
                >
                  Back to Login
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      )
    }
      {
        otpForm && (
          <div className="px-10 pb-16 pt-10">
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
                      message: 'otp is Required',
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
                  className="font-bold  py-3 rounded-full bg-primary text-white w-full"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        )
      }

      {
        resetPassForm &&  (
          <div className="px-10 pb-16 pt-10">
            <h1 className="text-xl font-semibold text-center mb-7">
             Reset Password
            </h1>

            <form onSubmit={handleSubmit(handleNewPassword)}>
              <div className="flex flex-col items-start ">
                <label htmlFor="otp" className="mb-1">
                 Your Email
                </label>
                <input
                  className="py-3 px-2 text-gray-500 rounded w-full  border-[1px]"
                  type="email"
                  value={otpEmail}
                  disabled
                  id="otp"
                />
              </div>
              <div className="flex flex-col items-start mt-5">
                <label htmlFor="otp" className="mb-1">
                  Enter New Password
                </label>
                <input
                  className="py-3 px-2 text-gray-500 rounded w-full  border-[1px]"
                  type="password"
                  id="password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === 'required' && (
                    <span className="pl-3 text-sm mt-1 text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="font-bold  py-3 rounded-full bg-primary text-white w-full"
                >
                  Create New Password
                </button>
              </div>
            </form>
          </div>
        )
      }
      {
        !forgotPassForm && !otpForm  && !resetPassForm && (
          <div className="flex justify-center">
            <div className="w-full px-10 pb-10 pt-10 shadow border rounded">
              <h1 className="text-xl font-bold text-center">
                Login Now
              </h1>
              <div className=" rounded-lg w-full mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div >
                    <div className="flex flex-col items-start mb-5">
                      <label htmlFor="email" className="ml-3 mb-1">
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
                    <div className="flex flex-col items-start">
                      <label htmlFor="password" className="ml-3 mb-1">
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
                          <span className=" text-sm mt-2 text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                        {errors.password?.type === 'minLength' && (
                          <span className=" text-sm mt-2  text-red-500">
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
                    <div className="flex justify-between mt-4">
                      <div
                        onClick={handleForgotPassForm}
                        className="text-sm text-secondary pr-2 pt-1 cursor-pointer font-semibold"
                      >
                        Forgot password?{' '}
                      </div>
                      <div
                        onClick={() => setForgotPassForm(true)}
                        className="text-sm bg-primary  flex items-center justify-center p-1 rounded text-white cursor-pointer font-semibold"
                      >
                        Send OTP
                      </div>
                    </div>

                    <div className="relative mt-7">
                      <button
                        type="submit"
                        className="font-bold  py-3 rounded bg-primary text-white w-full"
                      >
                        Login
                      </button>
                    </div>

                    {/* <div>
                <p className="text-sm text-center pt-3 pb-4">
                  Don't have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer font-bold"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
