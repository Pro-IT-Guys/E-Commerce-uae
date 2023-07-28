import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import DashboardLayout from '../../../../src/layouts/dashboard'
import { ButtonAnimate } from '../../../../src/components/animate'
import {
  getAllCountriesWithFees,
  updateFeeOfLocation,
} from '../../../../apis/fee.api'
import { toast } from 'react-hot-toast'

const DeliveryFee = ({}) => {
  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [state, setState] = useState(null)
  const [deliveryFee, setDeliveryFee] = useState(0)

  useEffect(() => {
    const getCountry = async () => {
      const result = await getAllCountriesWithFees()
      setCountry(result?.data)
    }
    getCountry()
  }, [])

  useEffect(() => {
    if (city && city.length > 0) {
      const selected = city?.find(i => i?.city_name === selectedCity)
      setDeliveryFee(selected?.delivery_fee)
    } else {
      const selected = state?.find(i => i?.state_code === selectedState)
      setDeliveryFee(selected?.delivery_fee)
    }
  }, [selectedCountry, selectedState, selectedCity])

  const handleCountryChange = e => {
    const countryId = e.target.value
    setSelectedCountry(countryId)
  }

  const handleStateChange = e => {
    if (!selectedCountry) return

    const stateId = e.target.value
    setSelectedState(stateId)
  }

  const handleDeliveryFee = async () => {
    const data = {
      countryId: selectedCountry,
      dataPayload: {
        state_code: selectedState,
        city_name: selectedCity,
        delivery_fee: Number(deliveryFee),
      },
    }
    const response = await updateFeeOfLocation(data)
    if (response?.success) {
      toast.success('Delivery fee updated successfully')
      // reset
      setSelectedCountry(null)
      setSelectedState(null)
      setSelectedCity(null)
    } else {
      toast.error('Failed to update delivery fee')
    }
  }

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <div className="bg-white p-5 shadow">
          <div className="w-full mt-[-50px]">
            <Typography variant="h6" sx={{ mt: 8, mb: 2 }}>
              Update city delivery fee
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCountry || ''}
                    label="Country"
                    onChange={e => handleCountryChange(e)}
                  >
                    {country?.map(option => (
                      <MenuItem key={option.country_code} value={option?._id}>
                        <Typography onClick={() => setState(option.states)}>
                          {option?.country}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    disabled={!selectedCountry}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedState || ''}
                    label="Country"
                    onChange={e => handleStateChange(e)}
                  >
                    {state?.map(option => (
                      <MenuItem
                        style={{ display: 'block' }}
                        key={option.state_code}
                        value={option?.state_code}
                      >
                        <Typography
                          style={{ display: 'block' }}
                          onClick={() => setCity(option?.cities)}
                        >
                          {option?.state_name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {city && city.length > 0 && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="city-label">City</InputLabel>
                    <Select
                      disabled={!selectedState}
                      labelId="city-label"
                      id="demo-simple-select"
                      value={selectedCity || ''}
                      label="City"
                      onChange={e => setSelectedCity(e.target.value)}
                    >
                      {city?.map(i => (
                        <MenuItem key={i?.city_name} value={i?.city_name}>
                          {i?.city_name || 'No city available in this state'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12} md={city && city.length > 0 ? 6 : 12}>
                <FormControl fullWidth>
                  <TextField
                    label="Delivery Fee"
                    name="delivery_fee"
                    value={deliveryFee || ''}
                    type="number"
                    onChange={e => setDeliveryFee(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={city && city.length > 0 ? 12 : 6}>
                <ButtonAnimate mediumClick={true}>
                  <Button
                    onClick={handleDeliveryFee}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: '130px' }}
                  >
                    Confirm
                  </Button>
                </ButtonAnimate>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  )
}

export default DeliveryFee
