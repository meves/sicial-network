import React, { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import { initializeApp } from './redux/app-reducer';
import './App.scss';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/Dialogs'));
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const Settings = lazy(() => import('./components/Settings/Settings'));

const App = props => {
  useEffect(() => {    
    props.initializeApp();
    // eslint-disable-next-line
  }, []);  
  if (!props.initialized) {
    return <Preloader/>
  }
  return (
    <div className="app-wrapper">
      <Header/>
      <Navbar />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="profile" element={withSuspense(ProfileContainer)} />
          <Route path="profile/:userId" element={withSuspense(ProfileContainer)} />
          <Route path="dialogs/*" element={withSuspense(DialogsContainer)} />
          <Route path="news" element={withSuspense(News)} />
          <Route path="music" element={withSuspense(Music)} />
          <Route path="users" element={withSuspense(UsersContainer)} />
          <Route path="settings" element={withSuspense(Settings)} />
          <Route path="login" element={<Login/>} />
          <Route path="*" element={withSuspense(NotFound)}/>
        </Routes>
      </div>
    </div>    
  );
  
}

const mapStateToProps = state => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);
