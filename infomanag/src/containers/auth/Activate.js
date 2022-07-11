import Layout from '../../hocs/Layout'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Navigate } from 'react-router'

import {Oval} from 'react-loader-spinner'
import xmlogo from '../../images/XM.png'

const Activate = ({
    activate,
    loading
    }) =>{
    const params = useParams();

    const [activated, setActivated] = useState(false);

    const activate_account = () => {
      const uid = params.uid
      const token = params.token
      activate(uid, token);
      setActivated(true);
    }

    if (activated && !loading)
    return <Navigate to='/' />;

    return (
      <Layout>
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
                  <div>
                  {/* <!-- Submit button --> */}
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
                        className="btn btn-primary btn-block btn-lg"
                        onClick={activate_account}>
                      Activate Account
                    </button>                    
                  }
                  </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }


const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps,{
activate
}) (Activate)