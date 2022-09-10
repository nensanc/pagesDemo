import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons'
import { 
    set_view_localserver 
} from '../../../redux/actions/localserver';

function Navbar({
    set_view_localserver

}) {
    const onClick =(e)=>{
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    const showServer =(e)=>{
        set_view_localserver(true)
    }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand ps-3" >GTD</Link>
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={onClick}><i className="fas fa-bars"></i></button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
            </div>
        </form> 

        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={showServer}>
        <FontAwesomeIcon icon={faServer} />
        </button>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#!">Settings</a></li>
                    <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#!">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
  )
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {
    set_view_localserver
})(Navbar)