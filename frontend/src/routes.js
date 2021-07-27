/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from 'views/Dashboard.js'
import UserProfile from 'views/UserProfile.js'
import TableList from 'views/TableList.js'
import Typography from 'views/Typography.js'
import Icons from 'views/Icons.js'
import Maps from 'views/Maps.js'
import Notifications from 'views/Notifications.js'
import Alerts from 'views/Alerts.js'
import OpenAccess from 'views/OpenAccess'
import SiteMap from 'views/SystemMap'
import Contact from 'components/Contacts/Contact'

const dashboardRoutes = [
  {
    path: '/alerts',
    name: 'Alerts',
    icon: 'nc-icon nc-alien-33',
    component: Alerts,
    layout: '/admin',
  },
  {
    path: '/openaccess',
    name: 'Openning Access',
    icon: 'nc-icon nc-chart-pie-35',
    component: OpenAccess,
    layout: '/admin',
  },
  {
    path: '/toran',
    name: 'Toran',
    icon: 'nc-icon nc-circle-09',
    component: Contact,
    layout: '/admin',
  },
  {
    path: '/systemmap',
    name: 'Systems Mapping',
    icon: 'nc-icon nc-notes',
    component: SiteMap,
    layout: '/admin',
  },
  {
    path: '/knowledges',
    name: 'Knowledges',
    icon: 'nc-icon nc-paper-2',
    component: Typography,
    layout: '/admin',
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
]

export default dashboardRoutes
