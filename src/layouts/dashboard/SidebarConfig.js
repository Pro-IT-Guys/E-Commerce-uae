// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// components
import SvgIconStyle from '../../components/SvgIconStyle'

// ----------------------------------------------------------------------

const getIcon = name => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
)

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
}

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    role: 'admin',
    items: [
      {
        title: 'E-Commerce',
        path: PATH_DASHBOARD.general.pageOne,
        icon: ICONS.dashboard,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    role: 'admin',
    items: [
      {
        title: 'my profile',
        path: PATH_DASHBOARD.userProfile.root,
        icon: ICONS.user,
      },
      {
        title: 'customer',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        role: 'admin',
        children: [{ title: 'All Users', path: PATH_DASHBOARD.user.pageUser }],
      },
      {
        title: 'product',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.ecommerce,
        role: 'admin',
        children: [
          {
            title: 'All Products',
            path: PATH_DASHBOARD.product.pageAllProduct,
          },
          {
            title: 'Create Products',
            path: PATH_DASHBOARD.product.createProduct,
          },
          { title: 'Review & Ratings', path: PATH_DASHBOARD.product.review },
        ],
      },
      // {
      //   title: "category",
      //   path: PATH_DASHBOARD.category.root,
      //   icon: ICONS.dashboard,
      //   children: [
      //     { title: "Add Category", path: PATH_DASHBOARD.category.addCategory },
      //     { title: "Add Brand", path: PATH_DASHBOARD.category.addBrand },
      //   ],
      // },
      {
        title: 'all orders',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.user,
        role: 'admin',
      },
      {
        title: 'my shop',
        path: PATH_DASHBOARD.myShop.root,
        icon: ICONS.ecommerce,
        role: 'admin',
        children: [
          {
            title: 'Add Campaign',
            path: PATH_DASHBOARD.myShop.addCampaign,
          },
          {
            title: 'Cupon & Discount',
            path: PATH_DASHBOARD.myShop.cupon,
          },
          {
            title: 'Terms & Conditions',
            path: PATH_DASHBOARD.myShop.terms,
          },
          {
            title: 'Privacy Policy',
            path: PATH_DASHBOARD.myShop.privacy,
          },
          {
            title: 'Return & Refund Policy',
            path: PATH_DASHBOARD.myShop.return,
          },
        ],
      },
      {
        title: 'currency ',
        path: PATH_DASHBOARD.currency.root,
        icon: ICONS.user,
        role: 'admin',
      },
      {
        title: 'Delivery Fee ',
        path: PATH_DASHBOARD.delivery.root,
        icon: ICONS.user,
        role: 'admin',
      },
      {
        title: 'tickets',
        path: PATH_DASHBOARD.ticket.root,
        icon: ICONS.user,
        role: 'admin',
      },
    ],
  },
  {
    subheader: 'general',
    role: 'user',
    items: [
      {
        title: 'my profile',
        path: PATH_DASHBOARD.userProfile.root,
        icon: ICONS.user,
      },
      {
        title: 'my orders',
        path: PATH_DASHBOARD.user.userOrder,
        icon: ICONS.user,
      },
      {
        title: 'my reviews',
        path: PATH_DASHBOARD.user.userReviews,
        icon: ICONS.user,
      },
    ],
  },
]

export default sidebarConfig
