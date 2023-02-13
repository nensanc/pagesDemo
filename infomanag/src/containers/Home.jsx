import Layout from "../hocs/Layout"
import { Link } from 'react-router-dom'
import ipad from '../images/home/ipad.png'
import bg_masthead from '../images/home/bg-masthead.jpg'
import { set_sign_state } from "../redux/actions/auth"
import { connect } from 'react-redux'
import video from '../images/home/bg.mp4';
import '../styles/home.css';

const Home = ({set_sign_state}) =>{
    const scrollToTop = () =>{
        set_sign_state(true)
      };
  return(
    <Layout>
        {/* <!-- Masthead--> */}
        <section className="body-bg">
            <video className="bg-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop"><source src={video} type="video/mp4" /></video>
            <div className="masthead">
                <div className="masthead-content px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                    <div className="d-flex justify-content-center rounded" 
                        style={{backgroundColor:'rgb(125,60,152,0.25)', padding:'50px'}}
                        >
                        <div className="text-center">
                            <p className="display-1 text-white">Gestor Transversal de Datos</p>
                            <h2 className="text-white mx-auto mt-2 mb-5">Gestion, apoyo y agilidad es lo que puedes encontrar en el GTD, somos XM</h2>
                            <a className="btn btn-primary" href="#about">Get Started</a>
                        </div>
                    </div>
                </div>                
            </div>
        </section>
        {/* <!-- About--> */}
        <section className="about-section text-center" id="about">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="text-white mb-4">Built with Bootstrap 5</h2>
                        <p className="text-white-50">
                            Grayscale is a free Bootstrap theme created by Start Bootstrap. It can be yours right now, simply download the template on
                            <a href="https://startbootstrap.com/theme/grayscale/">the preview page.</a>
                            The theme is open source, and you can use it for any purpose, personal or commercial.
                        </p>
                    </div>
                </div>
                <img className="img-fluid" src={ipad} alt="..." />
            </div>
        </section>
        {/* <!-- Projects--> */}
        <section className="projects-section bg-light" id="projects">
            <div className="container px-4 px-lg-5">
                {/* <!-- Featured Project Row--> */}
                <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src={bg_masthead} alt="..." /></div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="featured-text-r text-center text-lg-left">
                            <Link to="/listas" onClick={scrollToTop} style={{textDecoration:"none"}}>
                                <h4 className="text-center">Listas de Chequeo</h4>
                            </Link>                            
                            <p className="text-black-50 mb-0">Una forma de gestionar tus proyectos, creando actividades y tareas, consiguiendo que cada paso sea guiado y guardado</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div className="col-xl-4 col-lg-5">
                        <div className="featured-text-l text-center text-lg-left">
                            <Link to="/dashboard" onClick={scrollToTop} style={{textDecoration:"none"}}>
                                <h4 className="text-center">DashBoard</h4>
                            </Link> 
                            <p className="text-black-50 mb-0">Integración entre el modelo eléctrico de Power Factory, la información de SCADA, los datos Energéticos, los datos Eléctricos y la información de Proyectos</p>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src={bg_masthead} alt="..." /></div>
                </div>
                <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src={bg_masthead} alt="..." /></div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="featured-text-r text-center text-lg-left">
                            <h4>Calidad del Modelo Eléctrico</h4>
                            <p className="text-black-50 mb-0">Información y seguimiento de la calidad del modelo eléctrico de Power Factory</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div className="col-xl-4 col-lg-5">
                        <div className="featured-text-l text-center text-lg-left">
                            <h4>THCT</h4>
                            <p className="text-black-50 mb-0">Integración del aplicativo THCT con el modelo eléctrico para determinar la cantidad de FERNC en una zona determinada</p>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src={bg_masthead} alt="..." /></div>
                </div>
            </div>
        </section>
        {/* <!-- Signup--> */}
        <section className="signup-section" id="signup">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5">
                    <div className="col-md-10 col-lg-8 mx-auto text-center">
                        <i className="far fa-paper-plane fa-2x mb-2 text-white"></i>
                        <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
                        <form className="form-signup" id="contactForm" data-sb-form-api-token="API_TOKEN">
                            {/* <!-- Email address input--> */}
                            <div className="row input-group-newsletter">
                                <div className="col"><input className="form-control" id="emailAddress" type="email" placeholder="Enter email address..." aria-label="Enter email address..." data-sb-validations="required,email" /></div>
                                <div className="col-auto"><button className="btn btn-primary disabled" id="submitButton" type="submit">Notify Me!</button></div>
                            </div>
                            <div className="invalid-feedback mt-2" data-sb-feedback="emailAddress:required">An email is required.</div>
                            <div className="invalid-feedback mt-2" data-sb-feedback="emailAddress:email">Email is not valid.</div>
                            {/* <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted--> */}
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3 mt-2 text-white">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            {/* <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form--> */}
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3 mt-2">Error sending message!</div></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Contact--> */}
        <section className="contact-section bg-black">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 pb-5">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card py-4 h-100">
                            <div className="card-body text-center">
                                <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                                <h4 className="text-uppercase m-0">Address</h4>
                                <hr className="my-4 mx-auto" />
                                <div className="small text-black-50">4923 Market Street, Orlando FL</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card py-4 h-100">
                            <div className="card-body text-center">
                                <i className="fas fa-envelope text-primary mb-2"></i>
                                <h4 className="text-uppercase m-0">Email</h4>
                                <hr className="my-4 mx-auto" />
                                <div className="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card py-4 h-100">
                            <div className="card-body text-center">
                                <i className="fas fa-mobile-alt text-primary mb-2"></i>
                                <h4 className="text-uppercase m-0">Phone</h4>
                                <hr className="my-4 mx-auto" />
                                <div className="small text-black-50">+1 (555) 902-8832</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  )
}

const mapStateToProps = state => ({
  })
  export default connect(mapStateToProps, {
    set_sign_state,
  })(Home)