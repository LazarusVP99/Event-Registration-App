import { Route, Routes } from 'react-router-dom';

import RegistrationForm from './components/registration';
import Events from './components/event_cards';
import ViewMembers from './components/view';

import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  return (
    <Routes>
      <Route
        path='/'
        element={<Events dispatch={dispatch} />}
      />
      <Route
        path='/register/:id'
        element={<RegistrationForm dispatch={dispatch} />}
      />
      <Route
        path='/members/:id'
        element={<ViewMembers />}
      />
    </Routes>
  );
};

export default App;
