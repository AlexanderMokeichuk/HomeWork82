import Layout from "./Ul/components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artists/Artists";
import Albums from "./features/Albums/Albums";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Artists />)} />
        <Route path={"/albums/:id"} element={(<Albums />)} />
        <Route path={"*"} element={(<h1>Not found</h1>)} />
      </Routes>
    </Layout>
  );
}

export default App;
