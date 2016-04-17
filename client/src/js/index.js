import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import doodleReducers from './reducers/reducers'
import App from './containers/App'
import DoodlePlannerReact from './containers/DoodlePlannerReact'
import Players from './containers/Players'
import NewPlayer from './components/player/NewPlayer'
import EditPlayer from './components/player/EditPlayer'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import Moment from 'moment'

//let store = createStore(doodleReducers)
//
//render(
//    <Provider store={store}>
//        <App/>
//    </Provider>,
//    document.getElementById('doodleMainForm')
//)

momentLocalizer(Moment)
Moment.locale('en')

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={DoodlePlannerReact}/>
            <Route path="/players" component={Players}/>
            <Route path="/players/new" component={NewPlayer}/>
            <Route path="/players/:id" component={EditPlayer}/>
        </Route>
    </Router>
), document.getElementById('doodleMainForm'))