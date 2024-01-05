import './App.css';
import Home from './display/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './display/Login';
import Signupform from './display/Signupform';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './components/ContextReducer';
import Cart from './display/cart';
import MyOrder from './display/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>

        <div>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/Login' element={<Login />}></Route>
            <Route exact path='/Sign' element={<Signupform />}></Route>
            <Route exact path='/myOrder' element={<MyOrder />}></Route>
          </Routes>
        </div>

      </Router>

    </CartProvider>

  );
}

export default App;
