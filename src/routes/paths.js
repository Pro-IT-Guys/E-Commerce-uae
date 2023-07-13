// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/dashboard'

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  userProfile: {
    root: path(ROOTS_DASHBOARD, '/app/my-profile'),
  },
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/ecommerce'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/app/user'),
    pageUser: path(ROOTS_DASHBOARD, '/app/user/all-users'),
    userOrder: path(ROOTS_DASHBOARD, '/app/user/order'),
    userReviews: path(ROOTS_DASHBOARD, '/app/user/reviews'),
  },
  product: {
    root: path(ROOTS_DASHBOARD, '/app/product'),
    pageAllProduct: path(ROOTS_DASHBOARD, '/app/product/all-products'),
    createProduct: path(ROOTS_DASHBOARD, '/app/product/create-product'),
    review: path(ROOTS_DASHBOARD, '/app/product/review-product'),
  },
  myShop: {
    root: path(ROOTS_DASHBOARD, '/app/shop'),
    addCampaign: path(ROOTS_DASHBOARD, '/app/shop/add-campaign'),
    terms: path(ROOTS_DASHBOARD, '/app/shop/terms'),
    privacy: path(ROOTS_DASHBOARD, '/app/shop/privacy'),
    return: path(ROOTS_DASHBOARD, '/app/shop/return'),
    cupon: path(ROOTS_DASHBOARD, '/app/shop/cupon'),
  },
  // category: {
  //   root: path(ROOTS_DASHBOARD, "/app/category"),
  //   addCategory: path(ROOTS_DASHBOARD, "/app/category/add-category"),
  //   addBrand: path(ROOTS_DASHBOARD, "/app/category/add-brand"),
  // },
  order: {
    root: path(ROOTS_DASHBOARD, '/app/orders'),
    // getOrders: path(ROOTS_DASHBOARD, "/app/category/all-orders"),
  },
  currency: {
    root: path(ROOTS_DASHBOARD, '/app/currency'),
  },
  delivery: {
    root: path(ROOTS_DASHBOARD, '/app/delivery-fee'),
  },
  ticket: {
    root: path(ROOTS_DASHBOARD, '/app/tickets/chat'),
  },
}
