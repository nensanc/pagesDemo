import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router'
import '../../../styles/list.css'
import {Oval} from 'react-loader-spinner'

const Process = ({
    loading
    }) =>{
    const params = useParams();

    const [activated, setActivated] = useState(false);

    return (
      <section className="py-5">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-12 mb-5">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <a className="text-decoration-none link-dark stretched-link" href="#!"><h5 className="card-title mb-3">Administración del modelo eléctrico de Power Factory</h5></a>
                  <p className="card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
                    <div className="mt-3">
                        <ul className="list list-inline">
                            <li className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center"><i className="fa fa-check-circle checkicon"></i>
                                    <div className="ml-2">
                                        <h6 className="mb-0">Kickoff meeting</h6>
                                        <div className="d-flex flex-row mt-1 text-black-50 date-time">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">22 May 2020 11:30 PM</span></div>
                                            <div className="ml-3"><i className="fa fa-clock-o"></i><span className="ml-2">6h</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column mr-2">
                                        <div className="profile-image"><img className="rounded-circle" src="https://i.imgur.com/xbxOs06.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/KIJewDa.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/wwd9uNI.jpg" width="30" /></div><span className="date-time">11/4/2020 12:55</span></div>
                                    <i
                                        className="fa fa-ellipsis-h"></i>
                                </div>
                            </li>
                            <li className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center"><i className="fa fa-check-circle checkicon"></i>
                                    <div className="ml-2">
                                        <h6 className="mb-0">User Interview</h6>
                                        <div className="d-flex flex-row mt-1 text-black-50 date-time">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">25 May 2020 12:34 AM</span></div>
                                            <div className="ml-3"><i className="fa fa-clock-o"></i><span className="ml-2">4h</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column mr-2">
                                        <div className="profile-image"><img className="rounded-circle" src="https://i.imgur.com/xbxOs06.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/wwd9uNI.jpg" width="30" /></div><span className="date-time">12/5/2020 12:55</span></div><i className="fa fa-ellipsis-h"></i></div>
                            </li>
                            <li className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center"><i className="fa fa-check-circle checkicon"></i>
                                    <div className="ml-2">
                                        <h6 className="mb-0">Prototyping</h6>
                                        <div className="d-flex flex-row mt-1 text-black-50 date-time">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">17 May 2020 1:34 PM</span></div>
                                            <div className="ml-3"><i className="fa fa-clock-o"></i><span className="ml-2">6h</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column mr-2">
                                        <div className="profile-image"><img className="rounded-circle" src="https://i.imgur.com/xbxOs06.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/KIJewDa.jpg" width="30" /></div><span className="date-time">16/4/2020 1:55</span></div><i className="fa fa-ellipsis-h"></i></div>
                            </li>
                            <li className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center"><i className="fa fa-check-circle checkicon"></i>
                                    <div className="ml-2">
                                        <h6 className="mb-0">Call with client</h6>
                                        <div className="d-flex flex-row mt-1 text-black-50 date-time">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">12 May 2020 12:35 AM</span></div>
                                            <div className="ml-3"><i className="fa fa-clock-o"></i><span className="ml-2">6h</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column mr-2">
                                        <div className="profile-image"><img className="rounded-circle" src="https://i.imgur.com/wwd9uNI.jpg" width="30" /></div><span className="date-time">11/4/2020 12:55</span></div><i className="fa fa-ellipsis-h"></i></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }


const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{

}) (Process)