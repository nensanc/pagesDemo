import { connect } from 'react-redux';
import { send_data } from '../../../redux/actions/localserver';
import upps from '../../../images/Upps.png';


function DigPI({
    code,
    send_data,
    state_pf
}) {

    const onClick =(action)=>{
        send_data(
            code,
            "Acción en Power Factory",
            action,
            {"action":action}
            )
    }

  return (
    <section>
    <div className="container-fluid px-4">
        <h1 style={{marginTop:"4rem"}}>DigPI: Integración de la información de SCADA en Power Factory</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active"></li>
        </ol>   
        {!state_pf?
        <div className="col-xl-12 col-md-6">
            <div className="card mb-4">
                <div className="card-body">
                    <img src={upps} className="img-fluid" alt="..."/>
                </div>
            </div>
        </div>
        :
        <>     
        <div className="row mt-3">
            <div className="col-xl-12 col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <p>Configuración DigPI</p>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="stretched-link" href="#">View Details</a>
                        <div className="small"><i className="fas fa-angle-right"></i></div>
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
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
                DataTable Example
            </div>
            <div className="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>}
    </div>
</section>

)
}
const mapStateToProps = state => ({
    code: state.Localserver.code,
    state_pf: state.Localserver.state_pf,
})
export default connect(mapStateToProps, {
    send_data
})(DigPI)