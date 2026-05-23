import Dashboard from './pages/Dashboard';

import {
 ToastContainer
} from 'react-toastify';

import
'react-toastify/dist/ReactToastify.css';

function App() {

 return (

  <>

   <Dashboard />

   <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    theme="colored"
   />

  </>

 );

}

export default App;