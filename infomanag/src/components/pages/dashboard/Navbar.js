import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faFileCode } from '@fortawesome/free-solid-svg-icons'
import { 
    set_view_localserver,
    set_view_prj
} from '../../../redux/actions/localserver';
import { set_sign_state } from '../../../redux/actions/auth';

function Navbar({
    set_view_localserver,
    state_server,
    set_sign_state,
    set_view_prj,
    state_pf,
    prj_name
}) {
    const onClick =(e)=>{
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    const showServer =(e)=>{
        set_view_localserver(true)
    }

    const onHome = () =>{
        set_sign_state(false);
      };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" onClick={onHome} className="navbar-brand ps-3" >GTD</Link>
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={onClick}><i className="fas fa-bars"></i></button>
        
        <div className="ms-auto">
            {prj_name?
                <p className='text-white text-sm m-0 p-0'>{prj_name}</p>
            :null}
        </div>
        {state_pf? 
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" 
                id="sidebarToggle" onClick={(e)=>{set_view_prj(true)}}>
            <FontAwesomeIcon icon={faFileCode} />
        </button>
        :null
        }
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" 
                id="sidebarToggle" onClick={showServer}>
            <FontAwesomeIcon icon={faServer} style={{color:state_server?"green":"red"}} />
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
    state_server: state.Localserver.state_server,
    state_pf: state.Localserver.state_pf,
    prj_name: state.Localserver.prj_name,
})
export default connect(mapStateToProps, {
    set_view_localserver,
    set_sign_state,
    set_view_prj
})(Navbar)