import Layout from "./Ul/components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artists/Artists";
import Albums from "./features/Albums/Albums";
import Tracks from "./features/Tracks/Tracks";
import Register from "./features/Users/Register";
import Login from "./features/Users/Login";
import TracksHistory from "./features/TracksHistory/TracksHistory";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Artists />)} />
        <Route path={"/albums/:id"} element={(<Albums />)} />
        <Route path={"/tracks/:id"} element={(<Tracks />)} />
        <Route path={"/register"} element={(<Register />)} />
        <Route path={"/login"} element={(<Login />)} />
        <Route path={"/track_history"} element={(<TracksHistory />)} />
        <Route path={"*"} element={(<h1>Not found</h1>)} />
      </Routes>
    </Layout>
  );
}

export default App;
