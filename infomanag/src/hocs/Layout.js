import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Layout = (props) => {
    return(
      <div>
        <Navbar/>
        <ToastContainer autoClose={5000} />
        {props.children}
        <Footer/>
      </div>
    )
}

export default Layout