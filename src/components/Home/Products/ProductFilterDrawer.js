import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
import roundClearAll from '@iconify/icons-ic/round-clear-all'
import roundFilterList from '@iconify/icons-ic/round-filter-list'
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel,
  Slider,
  FormControl,
  Autocomplete,
  TextField,
  Chip,
} from '@mui/material'
import {
  BRAND_OPTION,
  CATEGORY_OPTION,
  CATEGORY_OPTION_ARRAY,
  COLOR_OPTION,
  FABRIC_OPTION,
  FABRIC_OPTION_ARRAY,
  SIZE_OPTION,
  STYLE_OPTION,
  STYLE_OPTION_ARRAY,
  TYPE_OPTION,
} from 'constant/product'
import { MIconButton } from 'src/components/@material-extend'
import { useContext, useState } from 'react'
import ColorManyPicker from '../common/ColorManyPicker'
import Scrollbar from '../common/Scrollbar'
import { ContextData } from 'context/dataProviderContext'
import CloseIcon from '@mui/icons-material/Close'

// ----------------------------------------------------------------------

// ProductFilterDrawer.propTypes = {
//   isOpenFilter: PropTypes.bool,
//   onResetFilter: PropTypes.func,
//   onOpenFilter: PropTypes.func,
//   onCloseFilter: PropTypes.func,
// };

export default function ProductFilterDrawer({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
}) {
  const [color, setColor] = useState([])
  const {
    searchTerm,
    category,
    type,
    style,
    fabric,
    setType,
    setStyle,
    setFabric,
    value,
    setValue,
    setCategory,
    fromCurrency,
    toCurrency,
  } = useContext(ContextData)

  const handleSelectFilterOption = (e, callback) => {
    const { value } = e.target
    callback(value)
  }

  const handlePriceRange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChange = selectedColor => {
    setColor(selectedColor)
  }

  const handleChecked = selectedColor => {
    if (Array.isArray(color)) {
      return color.indexOf(selectedColor) !== -1
    }
    return false
  }

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <MIconButton onClick={onCloseFilter}>
            <Icon icon={closeFill} width={20} height={20} />
          </MIconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <div className="pt-5 space-y-3 shadow py-5 px-2 bg-white ">
        
            <div className="bg-white shadow rounded">
              <div className=" py-2 px-3 border-b">
                <h1 className="font-semibold ">
                  {' '}
                  Filter by Price ({toCurrency})
                </h1>
              </div>
              <div className=" py-3 pl-4 pr-3 bg-white ">
                <Box>
                  <Slider
                  size='medium'
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={handlePriceRange}
                    min={0}
                    max={2000}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                  />
                </Box>

                <div className="flex justify-between items-center">
                  <div className="border px-3 rounded shadow-sm">
                    <p>{value[0]}</p>
                  </div>
                  <div className="border px-3 rounded shadow-sm">
                    <p>{value[1]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded">
              <div className="  py-2 px-3 border-b">
                <h1 className="font-semibold "> Filter by Categories</h1>
              </div>
              <div className=" py-3 px-2">

                <FormControl fullWidth>
                  <div>
                    <Autocomplete
                      size="small"
                      className="w-full "
                      multiple
                      freeSolo
                      value={category}
                      onChange={(event, newValue) => {
                        setCategory(newValue)
                      }}
                      options={CATEGORY_OPTION_ARRAY}
                      getOptionLabel={option => option}
                      renderTags={() => null}
                      renderInput={params => (
                        <TextField label="Category" {...params} />
                      )}
                    ></Autocomplete>

                    <div style={{ marginTop: '8px' }}>
                      {category?.map((option, index) => (
                        <Chip
                          key={option}
                          size="small"
                          label={option}
                          onDelete={() => {
                            setCategory(prevValue =>
                              prevValue?.filter(val => val !== option)
                            )
                          }}
                          deleteIcon={<CloseIcon />}
                          style={{
                            marginRight: '8px',
                            marginBottom: '8px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </FormControl>
              </div>
            </div>

            <div className="bg-white shadow rounded">
              <div className="  py-2 px-3 border-b">
                <h1 className="font-semibold "> Filter by Fabrics</h1>
              </div>
              <div className=" py-3 px-2">

                <FormControl fullWidth>
                  <div>
                    <Autocomplete
                      size="small"
                      className="w-full"
                      multiple
                      freeSolo
                      value={fabric}
                      onChange={(event, newValue) => {
                        setFabric(newValue)
                      }}
                      options={FABRIC_OPTION_ARRAY}
                      getOptionLabel={option => option}
                      renderTags={() => null}
                      renderInput={params => (
                        <TextField label="Fabric" {...params} />
                      )}
                    ></Autocomplete>

                    <div style={{ marginTop: '8px' }}>
                      {fabric.map((option, index) => (
                        <Chip
                          key={option}
                          size="small"
                          label={option}
                          onDelete={() => {
                            setFabric(prevValue =>
                              prevValue.filter(val => val !== option)
                            )
                          }}
                          deleteIcon={<CloseIcon />}
                          style={{
                            marginRight: '8px',
                            marginBottom: '8px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </FormControl>
              </div>
            </div>
            <div className="bg-white shadow rounded">
              <div className="  py-2 px-3 border-b">
                <h1 className="font-semibold "> Filter by Style</h1>
              </div>
              <div className=" py-3 px-2">
                <FormControl fullWidth>
                  <div>
                    <Autocomplete
                      size="small"
                      className="w-full"
                      multiple
                      freeSolo
                      value={style}
                      onChange={(event, newValue) => {
                        setStyle(newValue)
                      }}
                      options={STYLE_OPTION_ARRAY}
                      getOptionLabel={option => option}
                      renderTags={() => null}
                      renderInput={params => (
                        <TextField label="Style" {...params} />
                      )}
                    ></Autocomplete>

                    <div style={{ marginTop: '8px' }}>
                      {style.map((option, index) => (
                        <Chip
                          key={option}
                          size="small"
                          label={option}
                          onDelete={() => {
                            setStyle(prevValue =>
                              prevValue.filter(val => val !== option)
                            )
                          }}
                          deleteIcon={<CloseIcon />}
                          style={{
                            marginRight: '8px',
                            marginBottom: '8px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </FormControl>
              </div>
            </div>

            <div className="bg-white shadow rounded">
              <div className="  py-2 px-3 border-b">
                <h1 className="font-semibold "> Filter by Type</h1>
              </div>
              <div className=" py-3 px-2">
                <FormControl fullWidth>
                  <div>
                    <Autocomplete
                      size="small"
                      className="w-full"
                      multiple
                      freeSolo
                      value={type}
                      onChange={(event, newValue) => {
                        setType(newValue)
                      }}
                      options={TYPE_OPTION}
                      getOptionLabel={option => option}
                      renderTags={() => null}
                      renderInput={params => (
                        <TextField label="Type" {...params} />
                      )}
                    ></Autocomplete>

                    <div style={{ marginTop: '8px' }}>
                      {type.map((option, index) => (
                        <Chip
                          key={option}
                          size="small"
                          label={option}
                          onDelete={() => {
                            setType(prevValue =>
                              prevValue.filter(val => val !== option)
                            )
                          }}
                          deleteIcon={<CloseIcon />}
                          style={{
                            marginRight: '8px',
                            marginBottom: '8px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </FormControl>
              </div>
            </div>
          </div>
        </Scrollbar>
      </Drawer>
    </>
  )
}
