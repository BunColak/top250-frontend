import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'

const App = () => {
  return (
    <div className="h-screen bg-red-900 text-white flex flex-col">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:listId" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
