import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
//import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
//import User from './components/User';
import { authenticate } from './store/session';
import CreatingPostComponent from './components/CreatePosts/CreatePosts';
import HomeComponent from './components/HomePage/Home';
import CreatingSubrandditComponent from './components/CreateSubrand';
import NavBarComponent from './components/NavBar/NavBar';
import LoginModalComponent from './components/LoginModal/Login';
import SubrandPageComponent from './components/SubrandPage';
import UpdateSubrandditComponent from './components/UpdateSubrand';
import UpdatePostComponent from './components/UpdatePost';
import MyProfileComponent from './components/MyProfile/MyProfile';
import PostDetailComponent from './components/PostDetails/PostDetails';
import ErrorPageComponent from './components/ErrorPage/ErrorPage';

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
        <Route path="/posts/:postId" exact={true}>
          <PostDetailComponent />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/user/:userId" exact={true}>
          <MyProfileComponent />
        </ProtectedRoute>
        <ProtectedRoute path="/create-post" exact={true}>
          <CreatingPostComponent />
        </ProtectedRoute>
        <ProtectedRoute path="/posts/:postId/edit" exact={true}>
          <UpdatePostComponent />
        </ProtectedRoute>
        <ProtectedRoute path="/create-subranddit" exact={true}>
          <CreatingSubrandditComponent />
        </ProtectedRoute>
        <Route path="/r/:subrandditId" exact={true}>
          <SubrandPageComponent />
        </Route>
        <ProtectedRoute path="/r/:subrandditId/edit" exact={true}>
          <UpdateSubrandditComponent />
        </ProtectedRoute>
        <Route>
          <ErrorPageComponent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
