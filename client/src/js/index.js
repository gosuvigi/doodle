import React from 'react'
import { render } from 'react-dom'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import doodleReducers from './reducers/reducers'
import App from './containers/App'

//let store = createStore(doodleReducers)
//
//render(
//    <Provider store={store}>
//        <App/>
//    </Provider>,
//    document.getElementById('doodleMainForm')
//)

render(<App/>, document.getElementById('doodleMainForm'))