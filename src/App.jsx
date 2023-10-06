import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';

import { BrowserRouter as Router} from 'react-router-dom';
import { Routing } from './containers/routing/routing';

function App() {
  return (
    <Router>
      <Routing/>
    </Router>
  )
}

export default App;


