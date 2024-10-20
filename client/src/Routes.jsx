import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Spinner from './components/utils/spinner';
import Events from './components/event_cards';

import { useDispatch } from 'react-redux';

const ViewMembers = lazy(() => import('./components/view'));
const RegistrationForm = lazy(() => import('./components/registration'));

const App = () => {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Events dispatch={dispatch} />,
    },
    {
      path: '/register/:id',
      element: (
        <Suspense fallback={<Spinner />}>
          <RegistrationForm dispatch={dispatch} />,
        </Suspense>
      ),
    },
    {
      path: '/members/:id',
      element: (
        <Suspense fallback={<Spinner />}>
          <ViewMembers />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
