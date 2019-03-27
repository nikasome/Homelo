import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import axios from 'axios';
import Form from 'react-jsonschema-form';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
  <div>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Homelo</title>
    </Helmet>

    <div>
      <h1>
        <img src={logo} alt="logo" />
      </h1>
    </div>

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={HometePost} />
        <Route path="/homete/:id" component={Homete} />
      </Switch>
    </BrowserRouter>
  </div>
);

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/post" className="homete-create-button">
          <i>+</i>
        </Link>

        <ul>
          {HOMETE_LIST.map(function(homete, i) {
            return (
              <div id="homete-button-rapper">
                <Link to={'/homete/' + homete.homete_id}>
                  <li id="homete-button" key={i}>
                    <div>
                      <p>{homete.title}</p>
                    </div>
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
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
      <div id="form-container">
        <div id="form-rapper">
          <Form
            schema={schema}
            formData={formData}
            uiSchema={uischema}
            onSubmit={this.handleSubmit}
          />
        </div>
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
