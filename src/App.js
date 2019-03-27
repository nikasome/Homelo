import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import axios from 'axios';
import Form from 'react-jsonschema-form';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const HOMETE_LIST = [
  { homete_id: 'AAAA', title: 'ラーメン完飲' },
  { homete_id: 'BBBB', title: '生きた' },
  { homete_id: 'CCCC', title: '自炊した' },
  { homete_id: 'DDDD', title: '100点とった' }
];

const schema = {
  title: 'Homete',
  type: 'object',
  properties: {
    title: {
      title: 'タイトル',
      type: 'string'
    },
    pin: {
      title: 'pin',
      type: 'integer',
      minimum: 4
    },
    description: {
      title: 'description',
      type: 'string'
    }
  },
  required: ['title', 'pin', 'description']
};

const uischema = {
  title: {
    'ui:autofocus': true
  },
  pin: {
    'ui:placeholder': '4桁の数字'
  },
  description: {
    'ui:widget': 'textarea'
  }
};

const formData = {};

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/homete/post" component={HometePost} />
      <Route path="/homete/:id" component={Homete} />
    </Switch>
  </BrowserRouter>
);

class Home extends Component {
  render() {
    return (
      <div>
        <img src={logo} className="img" alt="logo" />

        <ul>
          {HOMETE_LIST.map(function(homete, i) {
            return (
              <div key={i}>
                <Link to={'/homete/' + homete.homete_id}>{homete.title}</Link>
              </div>
            );
          })}
        </ul>

        <Link to="/homete_post">
          <button>投稿</button>
        </Link>
      </div>
    );
  }
}

class HometePost extends Component {
  make_id() {
    // 生成する文字列の長さ
    var l = 8;

    // 生成する文字列に含める文字セット
    var c = 'abcdefghijklmnopqrstuvwxyz0123456789';

    var cl = c.length;
    var r = '';
    for (var i = 0; i < l; i++) {
      r += c[Math.floor(Math.random() * cl)];
    }
    return r;
  }

  handleSubmit({ formData }) {
    //sample post
    axios.post('/', {
      title: formData.title,
      pin: formData.pin,
      description: formData.description,
      homete_id: this.make_id()
    });
    //console.log(formData);
  }

  render() {
    return (
      <div>
        <Form
          schema={schema}
          formData={formData}
          uiSchema={uischema}
          onSubmit={this.handleSubmit}
        />
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
