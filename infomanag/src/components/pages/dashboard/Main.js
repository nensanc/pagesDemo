import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../styles/dashboard.css';
import { useState } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Psm from './Psm';
import LocalServer from './LocalServer';
import SelectPrj from './SelectPrj';
import Alert from '../../alert';
import DigPI from './DigPI';

function Main({

}) {

    const [page, setPage] = useState("digpi");

    const selectPage = (name) =>{
        setPage(name)
    }

    const GetPage = (page) =>{
        switch (page) {
            case "digpi":
                return(
                    <DigPI/>
                )
            case "psm":
                return(
                    <Psm/>
                )
            default:
                return(
                    null
                )
        }
    }

return (
<section className="sb-nav-fixed">
    <Navbar />
    <Alert />
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Link className="navbar-brand ps-3" to="/">GTD</Link>
                        <div className="sb-sidenav-menu-heading">Interface</div>
                        <button className="nav-link btn btn-link m-0" onClick={(e)=>selectPage("digpi")}>
                            <div className="sb-nav-link-icon mb-0 mt-0"><i className="fas fa-tachometer-alt mb-0"></i></div>
                            DigPI
                        </button>
                        <button className="nav-link btn btn-link m-0" onClick={(e)=>selectPage("psm")}>
                            <div className="sb-nav-link-icon mb-0 mt-0"><i className="fas fa-tachometer-alt mb-0"></i></div>
                            PSM
                        </button>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Layouts
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Pages
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a className="nav-link" href="login.html">Login</a>
                                        <a className="nav-link" href="register.html">Register</a>
                                        <a className="nav-link" href="password.html">Forgot Password</a>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                    Error
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a className="nav-link" href="401.html">401 Page</a>
                                        <a className="nav-link" href="404.html">404 Page</a>
                                        <a className="nav-link" href="500.html">500 Page</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <a className="nav-link" href="charts.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Charts
                        </a>
                        <a className="nav-link" href="tables.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Tables
                        </a>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            {GetPage(page)}
        <LocalServer />
        <SelectPrj />
        <Footer/>
        </div>
    </div>
</section>
  )
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {

})(Main)