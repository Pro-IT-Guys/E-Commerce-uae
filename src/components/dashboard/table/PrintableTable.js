import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ContextData } from 'context/dataProviderContext'
import { convertCurrency } from 'helpers/currencyHandler'
import React, { useContext, useEffect, useState } from 'react'

const PrintableTable = ({ orderData }) => {
  const { fromCurrency, toCurrency } = useContext(ContextData)
  const [isLoaded, setIsLoaded] = useState(false)
  /**
   * This function prints the contents of a specific HTML element and restores the original contents
   * of the page after printing.
   */
  const printDiv = () => {
    if (typeof window !== 'undefined') {
      let printContents = document.getElementById('download_section').innerHTML
      let originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()

      const tempLink = document.createElement('a')
      tempLink.href =
        'data:application/pdf;charset=utf-8,' +
        encodeURIComponent(printContents)

      const fileName = `invoice-${orderData?.userId?.name?.firstName}.pdf`
      tempLink.setAttribute('download', fileName)

      tempLink.click()

      document.body.innerHTML = originalContents
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      printDiv()
    }
  }, [isLoaded])

  return (
    <>
      <Card className="invoice_popup" id="download_section">
        <img
          className="w-[200px] pl-[30px]"
          src="/static/brand/aymi-logo.png"
          alt=""
        />
        <h6 className="sub_name">Top Abaya Brand in UAE - AYMI Fashion</h6>
        <div className="invoice_header_wrapper">
          <h1 class="invoice_header">INVOICE</h1>
        </div>

        <div className="inv_id_section">
          <div className="invoice_to_left">
            <h3>Invoice to:</h3>
            <h3 className="client_name">
              {orderData?.userId?.name?.firstName}{' '}
              {orderData?.userId?.name?.lastName}
            </h3>
            {orderData?.phoneNumber && (
              <h5>Contact: {orderData?.phoneNumber}</h5>
            )}

            {orderData?.email && <h5>Email: {orderData?.email}</h5>}

            {orderData?.shippingAddress && (
              <h5>
                Address: {orderData?.shippingAddress?.address_line}{' '}
                {orderData?.shippingAddress?.zipCode},{' '}
                {orderData?.shippingAddress?.city},{' '}
                {orderData?.shippingAddress?.state},{' '}
                {orderData?.shippingAddress?.country}
              </h5>
            )}
          </div>
          <div className="invoice_id_section_right">
            <div className="invoice_id invoice_id_top">
              <h3 className="invoice_id_header">Invoice ID</h3>
              <h5>{orderData?._id.slice(0, 10)}</h5>
            </div>
            <div className="invoice_id">
              <h3 className="invoice_id_header">Date</h3>
              <h5 className="invoice_date">
                {new Date().toLocaleDateString('en-US')}
              </h5>
            </div>
          </div>
        </div>

        <Grid
          sx={{ marginBottom: 5, paddingLeft: 10, paddingRight: 10 }}
          container
          spacing={5}
        >
          <Grid item xs={12}>
            {/* <TableContainer> */}
            <Table
              className="invoice_table"
              // sx={{ minWidth: 800 }}
              aria-label="table in dashboard"
            >
              <TableHead className="invoice_table_head">
                <TableRow>
                  <TableCell className="table_cell_no_border" align="left">
                    Serial
                  </TableCell>
                  <TableCell className="table_cell_no_border" align="center">
                    Product
                  </TableCell>
                  <TableCell className="table_cell_no_border" align="center">
                    Quantity
                  </TableCell>
                  <TableCell className="table_cell_no_border" align="center">
                    Payment Method
                  </TableCell>
                  <TableCell className="table_cell_no_border" align="center">
                    Payment Status
                  </TableCell>
                  <TableCell className="table_cell_no_border" align="right">
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData?.orderItems?.map((order, index) => (
                  <TableRow>
                    <TableCell align="left">
                      <Typography>{index + 1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        {`${
                          order?.product?.name.length > 20
                            ? order?.product?.name?.slice(0, 20)
                            : order?.product?.name
                        }`}
                        {order?.product?.name.length > 20 && '...'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {order?.quantity} pices
                    </TableCell>
                    <TableCell align="center">
                      {`${orderData?.paymentMethod
                        ?.charAt(0)
                        .toUpperCase()}${orderData?.paymentMethod?.slice(1)}(${
                        orderData?.currency
                      })`}
                    </TableCell>
                    <TableCell align="center">
                      {orderData?.isPaid === 'yes' ? 'Paid' : 'Unpaid'}
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {` ${convertCurrency(
                          fromCurrency,
                          toCurrency,
                          Number(order?.product?.sellingPrice) *
                            Number(order?.quantity)
                        )}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </TableContainer> */}
            <div className="invoice_footer">
              <div className="left_footer_section">
                <h5 className="footer_header">Thank you for your business</h5>
                <div>
                  <h5 className="footer_header">Terms & Conditions</h5>
                  <p>By purchasing, you agree to our terms and conditions.</p>
                </div>
              </div>
              <div className="right_footer_section">
                <div className="sub_total_wrapper">
                  <h4 className="sub_total">
                    Total :
                    {`${orderData?.currency === 'USD' ? '$' : ''} ${
                      orderData?.subTotal
                    } ${orderData?.currency === 'AED' ? 'AED' : ''}`}
                  </h4>
                  <h4 className="sub_total">
                    Delivery Fee :
                    {`${orderData?.currency === 'USD' ? '$' : ''} ${
                      orderData?.deliveryFee
                    } ${orderData?.currency === 'AED' ? 'AED' : ''}`}
                  </h4>
                  <h4 className="sub_total">
                    Subtotal :
                    {`${orderData?.currency === 'USD' ? '$' : ''} ${(
                      Number(orderData?.subTotal) +
                      Number(orderData?.deliveryFee)
                    ).toFixed(2)} ${
                      orderData?.currency === 'AED' ? 'AED' : ''
                    }`}
                  </h4>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="footer_border_wrapper">
          <h5 className="authorized_sign">Authorized Sign</h5>
        </div>
      </Card>
    </>
  )
}

export default PrintableTable
