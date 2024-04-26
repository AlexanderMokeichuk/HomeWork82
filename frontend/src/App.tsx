import Layout from "./Ul/components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artists/Artists";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Artists />)} />
        <Route path={"*"} element={(<h1>Not found</h1>)} />
      </Routes>
    </Layout>
  );
}

export default App;
