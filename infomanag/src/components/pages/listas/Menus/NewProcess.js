import { useState, useEffect } from 'react'
import {Oval} from 'react-loader-spinner'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
const NewProcess = ({
  loading
}) => {

  const [formData, setFormData] = useState({
    process_name: '',
    process_desc: '',
  });

  const { 
    process_name,
    process_desc,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{

  }
  return (
    <div className="card bg-glass mt-5 mb-5">
        <div className="card-body px-4 py-5 px-md-5">
        <p className="lead fw-normal text-black mb-4">
          Nuevo Proceso
          </p>
          <form onSubmit={e=>onSubmit(e)}>
            <div className="form-outline mb-4">
              <input 
                    className="form-control" 
                    name="process_name"
                    value={process_name}
                    onChange={e=>onChange(e)}
                    type="text"
                    required
                  />
              <label className="form-label" htmlFor="form3Example3">Nombre del Proceso</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-2">
              <textarea 
                    className="form-control" 
                    name="process_desc"
                    value={process_desc}
                    onChange={e=>onChange(e)}
                    type="text"
                    required
                    />
              <label className="form-label" htmlFor="form3Example4">Descripción del Proceso</label>       
            </div>
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
              <button type="submit" className="btn-primary btn-block btn-lg">
                Crear
              </button>                    
            }
            </div>
          </form>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
})

export default connect(mapStateToProps, {
  
}) (NewProcess)