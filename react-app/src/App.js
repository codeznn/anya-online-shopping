import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ProductDetails from './components/ProductDetails';
import ProductsBrower from './components/ProductsBrowser';
import CreatePreoduct from './components/CreateProduct';
import { authenticate } from './store/session';
import LoadUserReviews from './components/Reviews/LoadUserReviews';
import CreateReviewForm from './components/Reviews/CreateReviewForm';
import EditReviewForm from './components/Reviews/EditReviewForm';
import StoreManager from './components/StoreManager';

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
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <ProductsBrower/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
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
        <Route path='/products/:productId/new-review' exact={true} >
          <CreateReviewForm />
        </Route>
        <Route path='/reviews/:reviewId/edit-review' exact={true} >
          <EditReviewForm />
        </Route>
        <Route path='/products/:productId' exact={true} >
          <ProductDetails />
        </Route>
        <Route path='/new-product' exact={true} >
          <CreatePreoduct />
        </Route>
        <Route path='/my-reviews' exact={true} >
          <LoadUserReviews />
        </Route>
        <Route path='/store-manager' exact={true} >
          <StoreManager />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
