import './App.css';
import { Switch, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Auth from "./Pages/Auth/Auth"
import Host from "./Pages/Host/Host"
import RedirectUser from "./Pages/Host/RedirectUser/RedirectUser"


function App() {
  return (
    <>
       <Switch>
        <Route exact path="/">
           <Auth />
         </Route>
         <Route exact path="/Home">
           <Home  />
         </Route>
         <Route exact path="/Redirect/User">
           <RedirectUser />
         </Route>
         <Route exact path="/Host">
           <Host />
         </Route>
       </Switch>
    </>
  );
}


export default App;
