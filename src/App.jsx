import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/core/Body"
import Login from "./components/features/Login"
import Profile from "./components/features/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/features/Feed"
import Connection from "./components/features/Connection"
import Request from "./components/features/Request"

function App() {
  

  return (
    <>
   <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path = "/" element={<Body />} >
           <Route path= "/" element = {<Feed />} />
           <Route path= "/login" element = {<Login />} />
           <Route path= "/profile" element = {<Profile />} />
           <Route path= "/connection" element = {<Connection />} />
           <Route path= "/requests" element = {<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
    </>
  )
}

export default App
