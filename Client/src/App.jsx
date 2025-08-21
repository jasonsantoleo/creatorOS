// import './App.css'
import {Route,Routes} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import ProductCreationPage from './pages/ProductCreationPage'
import SharePage from './pages/SharePage'
import EarningsPage from './pages/EarningPage'
import PublicCreatorPage from './pages/PublicCreatorPage'

function App() {

  return (
    <div>
      <Routes>
        <Route
        path='/'
        element={
          <AuthPage/>
        }
        />
        <Route
        path='/home'
        element={
          <OnboardingPage/>
        }
        />
        <Route
        path='/dashboard'
        element={
          <DashboardPage/>
        }
        />
        <Route 
        path='/product'
        element={
          <ProductCreationPage/>
        }
        />
        <Route
        path='/share'
        element={
          <SharePage/>
        }
        />
        <Route
        path='/earning'
        element={
          <EarningsPage/>
        }
        />
        <Route
        path="/creator/:username"
        element={<PublicCreatorPage />}
      />
      </Routes>
    </div>
  )
}

export default App
