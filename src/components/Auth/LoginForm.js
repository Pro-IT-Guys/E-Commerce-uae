import { useContext, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import FetchUrls from 'src/utils/FetchUrls'
import { toast } from 'react-hot-toast'
import { ContextData } from 'context/dataProviderContext'

// ----------------------------------------------------------------------

export default function LoginForm({ onClose }) {
  const router = useRouter()
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
        if (res.status === 200) {
          // navigate(from, { replace: true })
          onClose()
          setUpdate(Math.random())
          toast.success('Login Successfully!')
          localStorage.setItem('token', res.headers.authorization.split(' ')[1])
          localStorage.setItem('role', res?.data?.data.role)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        } else {
          toast.error('Incorrect Email or Password!')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Incorrect Email or Password!')
      })
  }

  return (
    <div className="flex justify-center">
      <div className="w-full bg-[#f1fff4] p-10">
        <div className=" rounded-lg w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="flex flex-col items-start">
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
                    <span className="pl-5 text-sm mt-1 text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className="pl-5  text-sm mt-1 text-red-500">
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
              {/* <div className="flex justify-end">
                <span
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-end pr-2 pt-1 cursor-pointer font-semibold"
                >
                  Forgot password?{' '}
                </span>
              </div> */}

              <div className="relative mt-2">
                <button
                  type="submit"
                  className="font-bold  py-3 rounded-full bg-primary text-white w-full"
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
