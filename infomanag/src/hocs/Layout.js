import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import {ScrollSpy} from 'bootstrap';

window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) {
          return;
      }
      if (window.scrollY === 0) {
          navbarCollapsible.classList.remove('navbar-shrink')
      } else {
          navbarCollapsible.classList.add('navbar-shrink')
      }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
//   if (mainNav) {
//       new ScrollSpy(document.body, {
//           target: '#mainNav',
//           offset: 74,
//       });
//   };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});

const Layout = (props) => {

    useEffect(() => {
      props.refresh()
      props.check_authenticated()
      props.load_user()
    }, []);

    return(
      <div id="page-top">
        <Navbar/>
        <ToastContainer autoClose={1000} />
        {props.children}
        <Footer/>
      </div>
    )
}

export default connect(null, {
  check_authenticated,
  load_user,
  refresh,
}) (Layout)