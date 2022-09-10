import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


function DigCon({

}) {

    const onClick =(e)=>{
        console.log('Hola')
        const res = axios.get('http://127.0.0.1:5000/summary');
        console.log(res)
    }

  return (
    <div className="container-fluid px-4">
        <h1 className="mt-1">Conección con Power Factory</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <button className='btn btn-primary' onClick={onClick}>
            Flask
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

})
export default connect(mapStateToProps, {

})(DigCon)