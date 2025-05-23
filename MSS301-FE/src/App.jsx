import { BrowserRouter} from "react-router-dom";
import Router from "./router/Router";
import './styles/index.css'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
