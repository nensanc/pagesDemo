import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import { useRef} from 'react';
import { Oval } from 'react-loader-spinner';
import { 
    set_view_localserver,
    connection,
    localserver_off,
    send_data
} from '../../../redux/actions/localserver';

function LocalServer({
    set_view_localserver,
    loading,
    show,
    connection,
    state_server,
    localserver_off,
    send_data,
    code_save,
    state_pf
}) {

    const code = useRef(null);
    const path_python_pf = useRef(null);
    
    const onSubmit = e =>{
        e.preventDefault();
        if (state_server){
            localserver_off()
        }else{
        const value = code.current.value
        connection(value)
        }
    }
    
    const onConnPF =(e)=>{
        send_data(
            code_save,
            "Activando Power Factory",
            "activar_pf",
            {"path":path_python_pf.current.value}
        )
    }

    const handleClose = (e) =>{
        set_view_localserver(false)
    }

    const onClick =(action)=>{
        send_data(
            code_save,
            "Acción en Power Factory",
            action,
            {"action":action}
        )
    }

  return (
        <Modal
            show={show}
            onHide={handleClose}
            keyboard={false}
            size={state_server?"lg":""}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2 className='m-3'>Conexión con el servidor local</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className='m-3'>Conectar con el servidor</h5>
                <div className="d-flex flex-row m-3 p-0" style={{maxWidth:"25rem"}}>
                    <button 
                        onClick={onSubmit} type="submit" 
                        className="btn btn-primary btn-block mr-2">
                        {state_server?"Desconectar":"Conectar"}
                    </button>                    
                    &nbsp;&nbsp;
                    <input 
                        className="form-control ml-3 text-center" 
                        ref={code}
                        type="text"
                        placeholder="Código del servidor"
                        disabled={state_server?true:false}
                        defaultValue={code_save?code_save:null}
                    />
                </div>                                                  
                {state_server?
                    <>
                    <h5 className='m-3'>Conectar con Power Factory</h5>
                    <div className='d-flex flex-row m-3'>
                        {loading?
                            <button className="btn btn-primary btn-block mr-2">
                                <Oval
                                color="#fff"
                                width={20}
                                height={20}
                                />
                            </button>
                            :
                            <button onClick={onConnPF} 
                                    className="btn btn-primary btn-block mr-2"
                                    disabled={state_pf?true:false}>
                                {state_pf?"Conectado":"Conectar"}
                            </button>                    
                        }
                        &nbsp;&nbsp;
                        <input 
                            className="form-control" 
                            ref={path_python_pf}
                            type="text"
                            placeholder="Ruta de Python DigSilent"
                            disabled={state_pf?true:false}
                            defaultValue="C:\Program Files\DIgSILENT\PowerFactory 2020 SP4\Python\3.8"
                            />
                    </div>
                    </>
                    :null
                }
                {state_pf?
                <>  
                    <p style={{marginTop:"2rem", marginLeft:"1rem"}}>Mostrar y Ocultar Power Factory</p>
                    <button style={{marginLeft:"1rem"}} className='btn btn-link text-decoration-none' onClick={(e)=>onClick('show')}>
                        Show Power Factory
                    </button>
                    <button className='btn btn-link text-decoration-none' onClick={(e)=>onClick('hide')}>
                        Hide Power Factory
                    </button>
                </>
                :
                null
                }
            </Modal.Body>
      </Modal>
  )
}
const mapStateToProps = state => ({
    show: state.Localserver.localserver_show,
    loading: state.Auth.loading,
    state_server: state.Localserver.state_server,
    state_pf: state.Localserver.state_pf,
    code_save: state.Localserver.code,
})
export default connect(mapStateToProps, {
    set_view_localserver,
    connection,
    localserver_off,
    send_data
})(LocalServer)

