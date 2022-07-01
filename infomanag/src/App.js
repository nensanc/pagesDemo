import {Provider} from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Listas from './containers/Projects/listas';
function App() {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            {/* Error Display */}
            <Route path="*" element={<Error404/>}/>
            <Route exact path='/' element={<Home/>}/>

            {/* Authentication */}          
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
            <Route exact path='/reset_password' element={<ResetPassword/>}/>
            <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
            <Route exact path='/listas' element={<Listas/>}/>

          </Routes>
      </Router>
    </Provider>
  );
}

export default App;
