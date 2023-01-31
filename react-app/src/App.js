import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
//import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreatingPostComponent from './components/CreatePosts/CreatePosts';
import HomeComponent from './components/HomePage/Home';
import CreatingSubrandditComponent from './components/CreateSubrand';
import NavBarComponent from './components/NavBar/NavBar';
import LoginModalComponent from './components/LoginModal/Login';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBarComponent isLoaded={loaded} />
      <Switch>
        <ProtectedRoute path='/' exact={true} >
          <HomeComponent/>
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginModalComponent isOpen={true} modalToggle={() => {}}/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/create-post" exact={true}>
          <CreatingPostComponent />
        </ProtectedRoute>
        <ProtectedRoute path="/create-subranddit" exact={true}>
          <CreatingSubrandditComponent />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
