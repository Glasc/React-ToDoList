import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './Home'

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <Home />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
)
