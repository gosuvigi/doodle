import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import doodleReducers from './reducers/reducers'
import App from './containers/App'
import DoodlePlannerReact from './containers/DoodlePlannerReact'
import Players from './containers/Players'
import Player from './components/Player'

//let store = createStore(doodleReducers)
//
//render(
//    <Provider store={store}>
//        <App/>
//    </Provider>,
//    document.getElementById('doodleMainForm')
//)

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={DoodlePlannerReact}/>
            <Route path="/players" component={Players}/>
            <Route path="/players/:playerName" component={Player}/>
        </Route>
    </Router>
), document.getElementById('doodleMainForm'))