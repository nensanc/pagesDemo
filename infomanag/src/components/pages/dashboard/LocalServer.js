import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import { useRef} from 'react';
import { Oval } from 'react-loader-spinner';
import { setAlert } from '../../../redux/actions/alert';
import { set_view_localserver } from '../../../redux/actions/localserver';

function LocalServer({
    set_view_localserver,
    loading,
    show
}) {

    const code = useRef(null);

    
    const onSubmit = e =>{
        e.preventDefault();
        
    }  

    if (!loading){
    }

    const handleClose = (e) =>{
        set_view_localserver(false)
    }

  return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Conexión con el servidor local
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input 
                    className="form-control mb-2" 
                    ref={code}
                    type="text"
                    placeholder="Código del servidor"
                />                                                   
                <div>
                    {/* <!-- Submit button --> */}
                    {loading?
                    <button type="submit" className="btn btn-primary btn-block m-0">
                        <Oval
                        color="#fff"
                        width={20}
                        height={20}
                        />
                    </button>
                    :
                    <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block mb-2">
                        Conectar
                    </button>                    
                    }
                </div>
            </Modal.Body>
      </Modal>
        </>
  )
}
const mapStateToProps = state => ({
    show: state.Localserver.localserver_show,
    loading: state.Auth.loading,
})
export default connect(mapStateToProps, {
    set_view_localserver
})(LocalServer)

