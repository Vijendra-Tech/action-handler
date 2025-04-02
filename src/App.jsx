import './App.css'
import ActionButton from './approverhandler/components/ActionButton'
import SchedularEditiorApp from './Schedular/SchedularEditiorAppConnector'

function App() {
  return (
    <>
      <div style={{ margin: '20px' }}>
        <SchedularEditiorApp />
      </div>
      <ActionButton />
    </>
  )
}

export default App
