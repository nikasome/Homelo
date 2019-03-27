import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/home" component={Home} />
      <Route path="/homete_post" component={Post} />
      <Route path="/homete/:id" component={Homete} />
    </div>
  </BrowserRouter>
);

const Home = () => (
  <div>
    <h1>メイン画面</h1>
  </div>
);

const Post = () => (
  <div>
    <h1>Homete投稿画面</h1>
  </div>
);

class Homete extends Component {
  render() {
    let { id } = this.props.match.params;
    return (
      <div>
        <h1>{id}</h1>
      </div>
    );
  }
}

export default App;
