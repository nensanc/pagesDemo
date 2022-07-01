import { Fragment, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { NavLink, Link } from 'react-router-dom'
import {Navigation} from 'react-router';

import Alert from '../alert';

import { connect } from 'react-redux';
import { logout, set_sign_state } from '../../redux/actions/auth';
import '../../styles/home.css';
import logoxm from '../../images/XM.png'

function Navbar({
  isAuthenticated, 
  inSign,
  user,
  logout,
  set_sign_state,
}) {

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
    set_sign_state(false);
  };

  const onSign = () => {
    set_sign_state(true);
  }


  return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container px-3 px-lg-5">
              <Link to='/' onClick={scrollToTop} className="navbar-brand">GTD</Link>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                  <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ms-auto">
                      {inSign?
                      null:
                      <>
                      <li className="nav-item"><a className="nav-link" href="#about">Blogs</a></li>
                      <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
                      <li className="nav-item"><a className="nav-link" href="#signup">Contact</a></li></>}
                      {isAuthenticated?
                        null:
                        <><li className="nav-item"><Link to="/signup" onClick={onSign} className="nav-link">
                                                    Sign up
                                                  </Link></li>
                        <li className="nav-item"><Link to="/login" onClick={onSign} className="nav-link">
                                                    Sign in
                                                  </Link></li></>
                      }                      
                  </ul>
              </div>
          </div>
      </nav>
      <Alert />
      </>
  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  inSign: state.Auth.inSign,
})
export default connect(mapStateToProps, {
  logout,set_sign_state
})(Navbar)