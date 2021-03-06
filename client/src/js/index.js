import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import doodleReducers from './reducers/reducers'
import App from './containers/App'
import DoodlePlannerReact from './containers/DoodlePlannerReact'
import SearchPlayers from './components/player/SearchPlayers'
import NewPlayer from './components/player/NewPlayer'
import EditPlayer from './components/player/EditPlayer'
import SearchTemplates from './components/template/SearchTemplates'
import NewTemplate from './components/template/NewTemplate'
import EditTemplate from './components/template/EditTemplate'
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
            <Route path="/players" component={SearchPlayers}/>
            <Route path="/players/new" component={NewPlayer}/>
            <Route path="/players/:id" component={EditPlayer}/>
            <Route path="/templates" component={SearchTemplates}/>
            <Route path="/templates/new" component={NewTemplate}/>
            <Route path="/templates/:id" component={EditTemplate}/>
        </Route>
    </Router>
), document.getElementById('doodleMainForm'))