import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppRouting from './routing/AppRouting';
import NavBar from './components/nav-bar';

function App() {
  return (<>
    <NavBar />
    <AppRouting />
  </>
  );
}

export default App;
