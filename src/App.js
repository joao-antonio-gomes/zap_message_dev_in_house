import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes/Routes'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, store} from './stores'
import CustomSnackbar from './components/CustomSnackbar'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null}
                         persistor={persistor}>
                <BrowserRouter>
                    <Navbar />
                    <Routes />
                    <CustomSnackbar />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
