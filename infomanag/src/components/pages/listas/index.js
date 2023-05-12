import Layout from '../../../hocs/Layout'
import { connect } from 'react-redux'
import { view_new_process } from '../../../redux/actions/listas'
import NewProcess from './Menus/NewProcess'
import Requirements from './Menus/Requirements'


const Index = ({
  bool_new_process,
  view_new_process
}) => {

  const onclick = _ =>{
    view_new_process(!bool_new_process)
  } 

  return (
    <Layout>
        <section className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h1 className="display-5 fw-bolder text-white mb-2">Listas de Chequeo</h1>
                  <p className="lead fw-normal text-white-50 mb-4">Una forma facíl de crear, actualizar y usar tus Listas de Chequeo</p>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                    <button onClick={onclick} className="btn btn-primary btn-lg px-4 me-sm-3" >
                          Crear Nuevo Proceso                          
                    </button>
                    <a className="btn btn-outline-light btn-lg px-4" href="#!">Saber Mas</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img className="img-fluid rounded-3 my-5" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." />
                </div>
            </div>
          </div>
        </section>
        <section className="py-3">
        <div className="container px-5 my-5">
          <NewProcess/>
          <div className="row gx-5">
            <div className="col-lg-12 mb-5">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <p className="card-text mb-2 h4">
                    Administración del modelo eléctrico de Power Factory
                  </p>
                  <p className="card-text mb-0">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
                  <div className="d-flex align-items-end justify-content-between pt-4">
                    <div className="d-flex align-items-center">
                      <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                      <div className="small">
                        <div className="fw-bold">Martin Sánchez</div>
                        <div className="text-muted">Junio 12, 2022</div>
                      </div>                      
                    </div>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className='btn-sm btn-primary me-md-2'>Nuevo Requerimiento</button>
                        <button className='btn-sm btn-primary me-md-2'>Historial</button>
                        <button className='btn-sm btn-light'>Editar</button>
                      </div>
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">  
                  <div className="row list-bg">
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between align-items-center activity">
                          <div><i className="fa fa-clock-o"></i><span className="ml-2">11h 25m</span></div>
                          <div><span className="activity-done">Done Activities(4)</span></div>
                          <div className="icons"><i className="fa fa-search"></i><i className="fa fa-ellipsis-h"></i></div>
                      </div>
                      <Requirements/>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
  }

const mapStateToProps = state => ({
  bool_new_process: state.Listas.bool_new_process,
})

export default connect(mapStateToProps,{
  view_new_process
}) (Index)