import './index.css'
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import routes from './config/routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
