import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
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

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <FacebookIcon />,
    url: 'https://www.facebook.com/aymifashionofficial/',
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    url: 'https://www.instagram.com/aymi_fashions/',
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon />,
    url: 'https://twitter.com/AymiFashion',
  },
]

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: '#' },
      { name: 'Contact us', href: '/shop/contact' },
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
      { name: 'support@aymifashion.com', href: '#' },
      { name: 'Al Rawda-2, Ajman, UAE', href: '#' },
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
              <NextLink href="/">
                <div className="w-36 h-16">
                  <Image
                    src={logo}
                    alt="Picture of the logo"
                    width={150}
                    height={10}
                    loading="lazy"
                    className="cursor-pointer object-cover w-full h-full rounded-md"
                  />
                </div>
              </NextLink>
            </Grid>
            <Grid item xs={8} md={3}>
              <Typography variant="body2" sx={{ pr: { md: 5 } }}>
                Buy Luxurious Abaya Online and Discover the Wide Range of Design
                with AYMI Fashion
              </Typography>

              <Stack
                spacing={1.5}
                direction="row"
                justifyContent={{ md: 'flex-start' }}
                sx={{ mt: 2, color: 'whitespace', mb: { xs: 4, md: 0 } }}
              >
                {SOCIALS.map(social => (
                  <Link href={social?.url} target="_blank">
                    <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                      {social?.icon}
                    </IconButton>
                  </Link>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <div className="flex-none grid md:grid-cols-3 grid-cols-2 text-start gap-x-5  gap-y-10 text-sm ">
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
