export const getProductCountByCategory = (products, categoryName) => {
  try {
    return products.filter(product => product.category === categoryName).length
  } catch (error) {
    console.log(error)
  }
}

export const getOrderCountByCategory = (orders, categoryName) => {
  return orders?.reduce((count, order) => {
    const orderItemCount = order?.orderItems?.filter(
      item => item?.product?.category === categoryName
    ).length
    return count + orderItemCount
  }, 0)
}

export const getOrderCountByStatus = (orders, status) => {
  const orderCountPerDay = orders.reduce((countPerDay, order) => {
    if (order?.isPaid === 'yes' && order?.deliveryStatus === status) {
      const orderDate = new Date(order.createdAt).toLocaleDateString()
      countPerDay[orderDate] = (countPerDay[orderDate] || 0) + 1
    }
    return countPerDay
  }, {})
  console.log('orderCountPerDay', orderCountPerDay)
  return Object.values(orderCountPerDay).map(count => parseInt(count))
}
