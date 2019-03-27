import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const HOMETE_LIST = [
  { homete_id: 'AAAA', title: 'ラーメン完飲' },
  { homete_id: 'BBBB', title: '生きた' },
  { homete_id: 'CCCC', title: '自炊した' },
  { homete_id: 'DDDD', title: '100点とった' }
];

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/homete_post" component={Post} />
      <Route path="/homete/:id" component={Homete} />
    </div>
  </BrowserRouter>
);

class Home extends Component {
  render() {
    return (
      <div>
        <h1>メイン画面</h1>
        <ul>
          <li>
            <Link to="/homete_post">投稿する</Link>
          </li>
          <li>
            <Link to="/homete/123">見る</Link>
          </li>
        </ul>
        <ul>
          {HOMETE_LIST.map(function(homete, i) {
            return (
              <div key={i}>
                <Link to={'/homete/' + homete.homete_id}>{homete.title}</Link>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Post extends Component {
  render() {
    return (
      <div>
        <h1>Homete投稿画面</h1>
      </div>
    );
  }
}

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
