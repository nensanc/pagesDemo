import { useState } from 'react'
import {Oval} from 'react-loader-spinner'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import {Modal} from 'react-bootstrap';
import { view_new_process, create_process } from '../../../../redux/actions/listas';

const NewProcess = ({
  loading,
  bool_new_process,
  view_new_process,
  create_process
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

  const handleClose = (e) =>{
    view_new_process(!bool_new_process);
  }

  const onSubmit = (e) => {
    e.preventDefault();
      create_process(
        process_name,
        process_desc
      );
  }

  return (
    <Modal
    show={bool_new_process}
    onHide={handleClose}
    keyboard={false}
>
    <Modal.Header closeButton>
        <Modal.Title>
            <h2 className='m-3'>Agregar Nuevo Proceso</h2>
        </Modal.Title>
    </Modal.Header>
      <Modal.Body>
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
            <button 
                type="submit" 
                className="btn-primary btn-block btn-lg">
                Crear
            </button>                    
          }
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  bool_new_process: state.Listas.bool_new_process,
})

export default connect(mapStateToProps, {
  view_new_process,
  create_process
}) (NewProcess)