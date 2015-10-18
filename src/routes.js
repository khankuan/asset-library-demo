import React from 'react'
import { Router, Route, Link } from 'react-router';
import { resolve, context } from "react-resolver";
import createBrowserHistory from 'history/lib/createBrowserHistory';

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})


@context('alt')
@resolve('', ({color, alt}) => {
  if (typeof window !== undefined) return;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched test!")
      resolve(()=>{});
    }, 1000);
  });
})
class Test extends React.Component {
  render() {
    return (
      <button>Test</button>
    );
  }
}

@resolve('', () => {
  if (typeof window !== undefined) return;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched inbox!")
      resolve(()=>{});
    }, 1000);
  });
})
class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        <div>
          <Link to='/inbox/messages/5'>You have 1 new message</Link>
        </div>
        {this.props.children || "Welcome to your Inbox"}
        <Test color='pink' />
      </div>
    )
  }
}

@resolve('', props => {
  if (typeof window !== undefined) return;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched message!")
      resolve(()=>{});
    }, 2000);
  });
})
class Message extends React.Component {
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
}

const router = (
  <Router
    history={typeof window === 'undefined' ? null : createBrowserHistory()}
    location="history">
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
);

module.exports = router;
