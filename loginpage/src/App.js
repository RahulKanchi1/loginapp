
import './App.css';
import Singup from './component/singup';
import Home from './component/home';
import Login from './component/login';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'

function App() {




  return (
    <div >
     <Router>
      <Routes>
        <Route  path='/' element = { <Singup/> } />
        <Route path='/home' element = { <Home/>} />
        <Route path='/login' element = { <Login/>} />
      </Routes>
     </Router>
      
    </div>     
  );
}

export default App;
