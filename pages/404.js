import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { Box, Button, Typography, Container } from '@mui/material'
import { PageNotFoundIllustration } from '../src/assets'
import Link from 'next/link'
import { varBounceIn } from '../src/components/animate'
import Page from '../src/components/Page'
import LogoOnlyLayout from '../src/layouts/LogoOnlyLayout'
import { MotionContainer } from '../src/components/animate'

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}))

export default function PageNotFound() {
  return (
    <LogoOnlyLayout>
      <RootStyle title="404 Page Not Found | Minimal-UI">
        <Container>
          <MotionContainer initial="initial" open>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  Sorry, page not found!
                </Typography>
              </motion.div>
              <Typography sx={{ color: 'text.secondary' }}>
                Sorry, we couldn’t find the page you’re looking for. Perhaps
                you’ve mistyped the URL? Be sure to check your spelling.
              </Typography>

              <motion.div variants={varBounceIn}>
                <PageNotFoundIllustration
                  sx={{ height: 260, my: { xs: 5, sm: 10 } }}
                />
              </motion.div>

              <Link href="/">
                <Button size="large" variant="contained">
                  Go to Home
                </Button>
              </Link>
            </Box>
          </MotionContainer>
        </Container>
      </RootStyle>
    </LogoOnlyLayout>
  )
}
