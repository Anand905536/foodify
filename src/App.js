import { Route,Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Favorite from "./components/favorite/Favorite";
import ReciepeDetail from "./components/ReciepeDetail/ReciepeDetail";
import Wrong404 from "./404/Wrong404";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/favorite-reciepe" element={<Favorite/>}/>
      <Route path="/Reciepe-detail" element={<ReciepeDetail/>}/>
      <Route path="*" element={<Wrong404/>}/>
    </Routes>
    </>
  );
}

export default App;
