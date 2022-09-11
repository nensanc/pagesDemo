import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import { useRef} from 'react';
import { Oval } from 'react-loader-spinner';
import { 
    set_view_localserver,
    connection,
    localserver_off
} from '../../../redux/actions/localserver';

function LocalServer({
    set_view_localserver,
    loading,
    show,
    connection,
    state_server,
    localserver_off
}) {

    const code = useRef(null);

    
    const onSubmit = e =>{
        e.preventDefault();
        if (state_server){
            localserver_off()
        }else{
        const value = code.current.value
        connection(value)
        }
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
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Conexión con el servidor local
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state_server?
                    <h3 style={{color:'green'}}>La conexión está activa</h3>
                    :
                    <input 
                        className="form-control mb-3" 
                        ref={code}
                        type="text"
                        placeholder="Código del servidor"
                    />
                }                                                   
                <div>
                    {/* <!-- Submit button --> */}
                    {loading?
                    <button type="submit" 
                            className="btn btn-primary btn-block m-0">
                        <Oval
                        color="#fff"
                        width={20}
                        height={20}
                        />
                    </button>
                    :
                    <button 
                        onClick={onSubmit} type="submit" 
                        className="btn btn-primary btn-block mb-2">
                        {state_server?"Desconectar":"Conectar"}
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
    state_server: state.Localserver.state_server
})
export default connect(mapStateToProps, {
    set_view_localserver,
    connection,
    localserver_off
})(LocalServer)

