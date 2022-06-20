import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { login } from '../../redux/actions/auth'
import { Oval } from 'react-loader-spinner'
import { Navigate } from 'react-router'
import xmlogo from '../../images/XM.png'


const Login = ({
  login,
  onTop,
  loading,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { 
    email,
    password,
  } = formData;

  const [activated, setActivated] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    login(email, password);
    setActivated(true);
  }


  if (activated){
    return <Navigate to='/' replace={true}  />;
  }

  return(
    <Layout>
            {/* <!-- Section: Design Block --> */}
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10", marginTop:"11rem"}}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
                The best offer <br />
                <span style={{color: "hsl(218, 81%, 75%)"}}>for your business</span>
              </h1>              
              <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-4-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
              <img className="p-5 img-fluid" src={xmlogo} alt="..." />
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form>
                     {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                      Login
                    </button>
                  </form>
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
  loading: state.Auth.loading,
})

export default connect(mapStateToProps, {
  login
}) (Login)