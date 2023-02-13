import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';

import { useRef} from 'react';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport  } from "@fortawesome/free-solid-svg-icons";
import { 
    set_view_prj,
    send_data,
    select_prj
} from '../../../redux/actions/localserver';


function SelectPrj({
    show,
    code_save,
    loading,
    set_view_prj,
    list_prj,
    send_data,
    select_prj
}) {

    const name = useRef(null);
    
    const onSubmit = e =>{
        e.preventDefault();
        const action = "get_projects";
        send_data(
            code_save,
            "Obtener los proyectos de PF",
            action,
            {"name":name.current.value}
        )
    }  

    const handleClose = (e) =>{
        set_view_prj(false)
    }

  return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Seleccionar Proyecto
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="d-flex flex-row mb-2">
                            <input 
                                className="form-control" 
                                ref={name}
                                type="text"
                                maxLength={50}
                                placeholder="Nombre"
                            />
                        {/* <!-- Submit button --> */}
                        &nbsp;&nbsp;
                        {loading?
                        <button type="submit" className="btn btn-primary btn-block btn-lg m-0">
                            <Oval
                            color="#fff"
                            width={20}
                            height={20}

                            />
                        </button>
                        :
                        <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block btn-sm">
                            Buscar
                        </button>                    
                        }
                    </div>
                    <hr className="m-4" />
                    {list_prj.length?
                    <table className="table table-hover">
                    <tbody>
                        {list_prj && 
                        list_prj.length &&
                        list_prj.map((prj)=>(
                            <tr key={prj.id}>
                                <td>{prj.name}</td>
                                <td>
                                    <button className='btn btn-sm m-0 p-0'
                                            onClick={(e)=>{
                                                e.preventDefault();
                                                select_prj(prj.name)
                                            }}>
                                        <FontAwesomeIcon icon={faFileImport}/>
                                    </button>
                                </td>
                            </tr>
                        ))}                        
                    </tbody>
                    </table>
                    :
                    <p className="fs-5 m-3 d-flex justify-content-center">Click en buscar para mostrar los projectos</p>}
                </form>
                </Modal.Body>
      </Modal>
        </>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
    show: state.Localserver.prj_show,
    list_prj: state.Localserver.list_prj,
    code_save: state.Localserver.code,
})
export default connect(mapStateToProps, {
    set_view_prj,
    send_data,
    select_prj
})(SelectPrj)