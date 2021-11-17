import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "./components/nav-bar";
import AppRouting from './routing/AppRouting';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRouting/>
    </div>
  );
}

export default App;
