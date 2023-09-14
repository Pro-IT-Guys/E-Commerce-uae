import React from 'react'
import MainLayout from '../../src/layouts/main'
import { Container } from '@mui/material'
import Page from '../../src/components/Page'

export default function AboutUs() {
    return (
        <MainLayout>
         <Page title="About Us | AYMI Fashion">
         <Container maxWidth="lg">
                <div className='mt-44 bg-[#fbfbfd] sm:py-20 py-10 shadow'>
                    <div>
                        <h1 className="md:text-5xl text-2xl font-semibold text-center">Who We Are ?</h1>
                        <p className='text-sm  mt-2 sm:w-[80%] mx-auto text-center px-5'>Welcome to AYMI Fashion, your go-to destination for elegant and stylish abayas and sheilas online! At AYMI, we take pride in offering a carefully curated collection of modest fashion that reflects the timeless beauty and grace of traditional Islamic attire.</p>
                    </div>
                </div>

                <div className=' sm:py-20 py-10 space-y-10'>
                    <div>
                        <h1 className="text-2xl font-semibold  pb-1">Our Vision:</h1><hr />
                        <p className='mt-2 text-neutral text-justify'>AYMI Fashion was born out of a vision to empower women to embrace their cultural heritage while embracing contemporary trends. We believe that modesty can coexist with fashion, and our goal is to provide modern Muslim women with a diverse range of choices that cater to their unique preferences and styles.</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold  pb-1">Our Abayas and Sheilas: </h1><hr />
                        <p className='mt-2 text-neutral text-justify'>Each piece in our collection is meticulously designed with attention to detail, ensuring the utmost quality and comfort. From intricately embroidered abayas to minimalist and sophisticated sheilas, we offer a wide array of choices that cater to various occasions and tastes.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold  pb-1">Customer Experience:</h1><hr />
                        <p className='mt-2 text-neutral text-justify'>At AYMI Fashion, customer satisfaction is at the core of everything we do. We strive to create a seamless online shopping experience, making it easy for you to find the perfect abaya or sheila that complements your personality and sense of fashion. Our responsive and friendly customer support team is always ready to assist you with any queries or concerns.</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold  pb-1">Quality Assurance:
                        </h1><hr />
                        <p className='mt-2 text-neutral text-justify'>Quality is our promise. We source premium fabrics and materials to craft our abayas and sheilas, ensuring they are not only beautiful but also durable. Our designs are created with a keen eye on fashion trends, allowing you to stay on top of your style game without compromising on modesty.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold  pb-1">Community and Diversity:
                        </h1><hr />
                        <p className='mt-2 text-neutral text-justify'>AYMI Fashion embraces diversity and celebrates the richness of various cultures within the Islamic community. Our collection showcases a blend of traditional designs and contemporary influences, catering to customers from different backgrounds and regions.
                        </p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold  pb-1">Join the AYMI Fashion Community:
                        </h1> <hr />
                        <p className='mt-2 text-neutral text-justify'>We invite you to become a part of our growing community of empowered women who appreciate the artistry and grace of modest fashion. Whether you are looking for a chic everyday abaya or an exquisite sheila for a special occasion, AYMI Fashion has something just for you.

                        </p>
                    </div>
                    <div>
                        <p className='mt-2  text-justify italic font-semibold'>Thank you for choosing AYMI Fashion as your trusted online abaya and sheila shop. We look forward to accompanying you on your style journey and serving you with dedication and passion.

                            Welcome to AYMI Fashion - Where Modesty Meets Fashion!
                        </p>
                    </div>
                </div>
            </Container>
            </Page>
        </MainLayout>
    )
}
