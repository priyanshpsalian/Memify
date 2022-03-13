import './App.css';
import Homescreen from './Components/Home';
import Memes from './Components/Cards';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import AppPage from './Assets/template';
import Imager from './Assets/display';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homescreen}/> 
          <Route path="/card" component={Memes}/> 
          <Route path="/main/:id" component={AppPage}></Route>  
          <Route path="/image/:exid" component={Imager}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;