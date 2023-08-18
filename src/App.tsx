import './index.css'
import Home from './pages/Home';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import routes from './config/routes';
import { WeatherAuth } from './auth/WeatherAuth';
import SignIn from './pages/SignIn';

function PrivateRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  )
}

function App() {
  const { isAuthenticated } = WeatherAuth()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <Route path="*" element={<PrivateRoutes />} />
          ) : (
            <>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/signin" element={<SignIn />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
