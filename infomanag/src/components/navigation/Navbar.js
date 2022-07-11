import { Link } from 'react-router-dom'
import Alert from '../alert';
import { connect } from 'react-redux';
import { logout, set_sign_state, set_signup_status, set_login_status } from '../../redux/actions/auth';
import logoxm from '../../images/XM.png'
import '../../styles/home.css'

function Navbar({
  isAuthenticated, 
  inSign,
  user,
  logout,
  set_sign_state,
  set_login_status,
  set_signup_status
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
    set_login_status();
    set_signup_status();
  }

  const onLogout = () =>{
    logout()
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
                      {user?
                        <>
                          <div className="topbar-divider d-none d-sm-block"></div>
                          <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" id="userPerfile" role="button" href="#drop"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.get_full_name}</span>
                                <img className="img-profile rounded-circle"
                                    src={logoxm} style={{width:"25px",height:"25px"}}/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userPerfile">
                                <a className="dropdown-item" href="#drop">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={onLogout} href="#drop" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                          </li>
                          </>
                        :
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
  user: state.Auth.user,
  isAuthenticated: state.Auth.isAuthenticated,
  inSign: state.Auth.inSign,
})
export default connect(mapStateToProps, {
  logout,set_sign_state,
  set_login_status,
  set_signup_status
})(Navbar)