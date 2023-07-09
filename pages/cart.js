import { Card, Container, Grid } from '@mui/material'
import MainLayout from 'src/layouts/main'

export default function CartPage() {
  return (
    <MainLayout>
      <div className="bg-[#f7f7ff9c] pb-20  pt-5">
        <Container maxWidth="lg">
          <Card className="mt-20  pb-10">
            <Grid container>
              <Grid></Grid>
            </Grid>
          </Card>
        </Container>
      </div>
    </MainLayout>
  )
}
