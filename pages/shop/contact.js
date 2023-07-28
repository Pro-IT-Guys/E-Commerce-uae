import React from 'react'
import MainLayout from '../../src/layouts/main'
import { Button, Container } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <MainLayout>
            <div className="sm:py-20 py-10 mt-32">
                <Container
                    maxWidth="lg"
                    className=" "
                >
                    <div className="md:flex gap-10 p-5 bg-[#fbfbfd]  rounded-xl shadow">
                        <div className="md:w-[40%]">
                            <h1 className='font-bold text-center py-4 text-3xl'>Contact Us</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <div className="flex flex-col items-start mb-5">
                                        <label htmlFor="email" className="ml-1 mb-1">
                                            Your Email
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
                                        <label className="label m-1">
                                            {errors.email?.type === 'required' && (
                                                <span className=" text-sm  text-red-500">
                                                    {errors.email.message}
                                                </span>
                                            )}
                                            {errors.email?.type === 'pattern' && (
                                                <span className="text-sm  text-red-500">
                                                    {errors.email.message}
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="password" className="ml-1 mb-1">
                                            Your Message
                                        </label>
                                        <textarea
                                            type="text"
                                            className="py-3 px-3 rounded w-full h-36 border-[1px]"
                                            id="message"
                                            {...register('message', {
                                                required: {
                                                    value: true,
                                                    message: 'Message is Required',
                                                }
                                            })}
                                        />
                                        <label className="label m-1">
                                            {errors.message?.type === 'required' && (
                                                <span className=" text-sm text-red-500">
                                                    {errors.message.message}
                                                </span>
                                            )}
                                        </label>
                                    </div>

                                    <div className="relative mt-7">
                                        <button
                                            type="submit"
                                            className="font-bold  py-3 rounded bg-primary text-white w-full"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="md:w-[60%] mt-10 md:mt-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14732.804523400351!2d91.87001616256866!3d22.608963251482823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2b2bc4ac17a3%3A0x27643f37d448b04!2sDharmapur%20High%20School!5e0!3m2!1sen!2sbd!4v1688411737450!5m2!1sen!2sbd"
                                //   width="800"
                                //   height="450"
                                //   style="border:0;"
                                className="w-full h-[500px] rounded-xl"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                </Container>
            </div>
        </MainLayout>
    )
}
