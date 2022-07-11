import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { signup, set_sign_state } from '../../redux/actions/auth'
import '../../styles/signup.css'
import xmlogo from '../../images/XM.png'
import { setAlert } from '../../redux/actions/alert'
import { Navigate } from 'react-router'
import { Oval } from 'react-loader-spinner'

const Signup = ({
  signup, 
  setAlert, 
  loading, 
  signupStatus, 
  set_sign_state
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  })

  const [accountCreated, setAccountCreated] = useState(false);

  const { 
    first_name,
    last_name,
    email,
    password,
    re_password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    if (password === re_password){
    signup(first_name, last_name, email, password, re_password);
    setAccountCreated(true);
    }else{
      setAlert(true,"Password do not Match", '#fcbfbf')
    }
  }

  if (accountCreated && !loading && signupStatus){
    set_sign_state(false);
    return <Navigate to='/' />;
  }
  
  return (
    <Layout>
      {/* <!-- Section: Design Block --> */}
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10",marginTop:"5rem"}}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
                La mejor opción <br />
                <span style={{color: "hsl(218, 81%, 75%)"}}>para gestionar tus procesos</span>
              </h1>
              <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
              <img className="p-5 img-fluid" src={xmlogo} alt="..." />
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={e=>onSubmit(e)}>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input 
                                type="text" 
                                className="form-control" 
                                name="first_name"
                                value={first_name}
                                onChange={e=>onChange(e)}
                                required
                                />
                          <label className="form-label" htmlFor="form3Example1">First name</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input 
                                className="form-control" 
                                name="last_name"
                                value={last_name}
                                onChange={e=>onChange(e)}
                                type="text"
                                required
                                />
                          <label className="form-label" htmlFor="form3Example2">Last name</label>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                      <input 
                            className="form-control" 
                            name="email"
                            value={email}
                            onChange={e=>onChange(e)}
                            type="email"
                            required
                            />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                      <input 
                            className="form-control" 
                            name="password"
                            value={password}
                            onChange={e=>onChange(e)}
                            type="password"
                            required
                            />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    {/* <!-- Confirm Password input --> */}
                    <div className="form-outline mb-4">
                      <input 
                            className="form-control" 
                            name="re_password"
                            value={re_password}
                            onChange={e=>onChange(e)}
                            type="password"
                            required
                            />
                      <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                    </div>

                    {/* <!-- Submit button --> */}
                    <div>
                    {loading?
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                          <Oval
                          color="#fff"
                          width={20}
                          height={20}
                          />
                        </button>
                        :
                        <button 
                              type="submit" 
                              className="btn btn-primary btn-block btn-lg">
                              Register
                        </button>
                    }
                    </div>
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
  signupStatus: state.Auth.signupStatus
})

export default connect(mapStateToProps, {
  signup, setAlert, set_sign_state
}) (Signup)