import { connect } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { useRef} from 'react';
import { send_data } from '../../../redux/actions/localserver';

function DigConn({
    loading,
    send_data,
    code
}) {

    const path_python_pf = useRef(null);

    const onConnPF =(e)=>{
        send_data(
            code,
            "Activando Power Factory",
            "activar_pf",
            {"path":path_python_pf.current.value}
            )
    }

    const onClick =(action)=>{
        send_data(
            code,
            "Acción en Power Factory",
            action,
            {"action":action}
            )
    }

  return (
    <div className="container-fluid px-4">
        <h1 style={{marginTop:"4rem"}}>Conección con Power Factory</h1>
        <ol className="breadcrumb mb-2">
            <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <div className="d-flex flex-row m-0 p-0" style={{maxWidth:"50rem"}}>
            <input 
                className="form-control" 
                ref={path_python_pf}
                type="text"
                placeholder="Ruta de Python DigSilent"
                defaultValue="C:\Program Files\DIgSILENT\PowerFactory 2020 SP4\Python\3.8"
                />
            {/* <!-- Submit button --> */}
            &nbsp;&nbsp;
            {loading?
            <button className="btn btn-primary">
                <Oval
                color="#fff"
                width={20}
                height={20}
                />
            </button>
            :
            <button onClick={onConnPF} className="btn btn-primary m-0 p-1">
                Conectar
            </button>                    
            }
        </div>
        <button className='btn btn-primary mb-2 mt-2' onClick={(e)=>onClick('show')}>
            Show Power Factory
        </button>
        <button className='btn btn-primary mb-2 mt-2' onClick={(e)=>onClick('hide')}>
            Hide Power Factory
        </button>
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Primary Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Warning Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                    <div className="card-body">Success Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Danger Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Area Chart Example
                    </div>
                    <div className="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i>
                        Bar Chart Example
                    </div>
                    <div className="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                </div>
            </div>
        </div>
    </div>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
    code: state.Localserver.code
})
export default connect(mapStateToProps, {
    send_data
})(DigConn)