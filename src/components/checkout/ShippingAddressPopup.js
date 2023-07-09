import React, { useContext } from 'react'
import { ImCross } from 'react-icons/im'
import { ContextData } from 'context/dataProviderContext'
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { ButtonAnimate } from '../animate'

const ShippingAddressPopup = ({
  setOpenPopup,
  handleCountryChange,
  selectedCountry,
  country,
  setState,
  handleStateChange,
  selectedState,
  state,
  setCity,
  selectedCity,
  city,
  setSelectedCity,
  handleAdditionalInfo,
  handleConfirmAddress,
  loading,
}) => {
  return (
    <div className="popup_wrapper">
      <div className="popup_content relative">
        <ImCross
          onClick={() => setOpenPopup(false)}
          className="absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer"
        />
        <div>
          <div className="w-full mt-[-50px]">
            <Typography variant="h6" sx={{ mt: 8, mb: 2 }}>
              Shipping Address
            </Typography>
            <Grid container spacing={1}>
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    onChange={e => handleAdditionalInfo(e)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={e => handleAdditionalInfo(e)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={city && city.length > 0 ? 6 : 12}>
                <FormControl fullWidth>
                  <TextField
                    label="Address line"
                    name="address_line"
                    onChange={e => handleAdditionalInfo(e)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={city && city.length > 0 ? 12 : 6}>
                <ButtonAnimate mediumClick={true}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: '130px' }}
                    onClick={handleConfirmAddress}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Confirm'}
                  </Button>
                </ButtonAnimate>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingAddressPopup
