import { Icon } from '@iconify/react'
import googleFill from '@iconify/icons-eva/google-fill'
import twitterFill from '@iconify/icons-eva/twitter-fill'
import facebookFill from '@iconify/icons-eva/facebook-fill'
import linkedinFill from '@iconify/icons-eva/linkedin-fill'
import { Link as ScrollLink } from 'react-scroll'
import logo from '../../assets/logo/aymi-logo.png'
// next
import NextLink from 'next/link'
// material
import { styled } from '@mui/material/styles'
import {
  Grid,
  Link,
  Stack,
  Divider,
  Container,
  Typography,
  IconButton,
} from '@mui/material'
import Image from 'next/image'
//
// import Logo from '../../components/Logo'

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Twitter', icon: twitterFill },
]

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: '#' },
      { name: 'Contact us', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '/shop/terms-and-condition' },
      { name: 'Privacy Policy', href: '/shop/privacy-policy' },
      { name: 'Return Policy', href: '/shop/return-and-refund-policy' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'support@minimals.cc', href: '#' },
      { name: 'Los Angeles, 359  Hidden Valley Road', href: '#' },
    ],
  },
]

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  // backgroundColor: theme.palette.background.default,
  zIndex: 9,
}))

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <div className="bg-[#1b1b1b] text-white">
      <RootStyle>
        <Divider />
        <Container maxWidth="lg" sx={{ pt: 7 }}>
          <Grid
            container
            justifyContent={{ md: 'space-between' }}
            sx={{ textAlign: { md: 'left' } }}
            className="md:pb-20 pb-10 "
          >
            <Grid item xs={12} sx={{ mb: 3 }}>
              {/* <ScrollLink to="move_top" spy smooth>
                <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
              </ScrollLink> */}
              <NextLink href="/">
                {/* <Logo /> */}
                <Image
                  src={logo}
                  alt="Picture of the logo"
                  width={150}
                  height={50}
                  className="cursor-pointer object-cover w-full rounded-md"
                />
              </NextLink>
            </Grid>
            <Grid item xs={8} md={3}>
              <Typography variant="body2" sx={{ pr: { md: 5 } }}>
                The starting point for your next project with Minimal UI Kit,
                built on the newest version of Material-UI ©, ready to be
                customized to your style.
              </Typography>

              <Stack
                spacing={1.5}
                direction="row"
                justifyContent={{ md: 'flex-start' }}
                sx={{ mt: 2, color: 'whitespace', mb: { xs: 4, md: 0 } }}
              >
                {SOCIALS.map(social => (
                  <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                    <Icon
                      className="text-white"
                      icon={social.icon}
                      width={16}
                      height={16}
                    />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <div
                // spacing={5}
                // direction={{ xs: "column", md: "row" }}
                // justifyContent="space-between"
                className="flex-none grid md:grid-cols-3 grid-cols-2 text-start gap-x-5  gap-y-10 text-sm "
              >
                {LINKS.map(list => {
                  const { headline, children } = list
                  return (
                    <Stack key={headline} spacing={3}>
                      <Typography component="p" variant="overline">
                        {headline}
                      </Typography>
                      {children.map(link => (
                        <NextLink key={link.name} href={link.href} passHref>
                          <Link
                            color="inherit"
                            className="text-xs md:text-sm"
                            sx={{ display: 'block' }}
                          >
                            {link.name}
                          </Link>
                        </NextLink>
                      ))}
                    </Stack>
                  )
                })}
              </div>
            </Grid>
          </Grid>
          <Divider />
          <div className="py-4 sm:flex items-center justify-between gap-2">
            <div className="flex items-center  gap-2">
              <h1 className="text-xs">
                Copyright © 2023. All Rights Reserved By ~
              </h1>
              <Link href="/">
                <span className="uppercase text-xs text-warning font-semibold">
                  AYMI
                </span>
              </Link>
            </div>
            <div className="flex items-center  gap-2">
              <h1 className="text-xs">Design & Developed By ~ </h1>
              <Link
                href="https://www.facebook.com/ImRanKhan81m/"
                target="blank"
              >
                <span className="uppercase text-xs text-warning font-semibold">
                  Pro-IT-Guys
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </RootStyle>
    </div>
  )
}
