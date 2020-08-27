import ButtonPage from './pages/button.jsx';
import CalendarPage from './pages/calendar.jsx';
import DatePickerPage from './pages/datePicker.jsx';
import FormPage from './pages/form.jsx';
// import BackTopPag from './pages/backTop.jsx';
import PickerPage from './pages/picker.jsx';
import PullPage from './pages/pull.jsx';

import App from './App.jsx';

console.log(App)

export default [
  {
    ...App,
    routes: [
      {
        component: ButtonPage,
        path: '/',
        exact: true
      },
      {
        component: CalendarPage,
        path: '/calendar',
        exact: true
      },
      {
        component: DatePickerPage,
        path: '/datePicker',
        exact: true
      },
      {
        component: FormPage,
        path: '/form',
        exact: true
      },
      // {
      //   component: BackTopPage,
      //   path: 'backTop',
      //   exact: true
      // },
      {
        component: PickerPage,
        path: '/picker',
        exact: true
      },
      {
        component: PullPage,
        path: '/pull',
        exact: true
      }
    ]
  }
];
