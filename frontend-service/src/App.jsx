import { BrowserRouter } from 'react-router-dom'
import Router from './router/Router'
import './styles/index.css'
import DifyChatbot from './components/common/DifyChatbot'

function App() {
  return (
    <BrowserRouter>
      <Router />
      <DifyChatbot />
    </BrowserRouter>
  )
}

export default App
