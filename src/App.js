import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import axios from 'axios';
import Form from 'react-jsonschema-form';
import { withRouter } from 'react-router';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const schema = {
  title: 'Homete',
  type: 'object',
  properties: {
    title: {
      title: 'タイトル',
      type: 'string'
    },
    description: {
      title: 'description',
      type: 'string'
    },
    pin: {
      title: 'pin',
      type: 'integer',
      minimum: 4
    }
  },
  required: ['title', 'pin', 'description']
};

const uischema = {
  title: {
    'ui:autofocus': true
  },
  description: {
    'ui:widget': 'textarea'
  },
  pin: {
    'ui:placeholder': 'Alexaと連携するための4桁の数字'
  }
};

const formData = {};

const shortid = require('shortid');

const ABOUT_HOMETE = {
  title: 'ラーメン完飲',
  description: 'こってりでした',
  homents: ['はいプロ', '神', '天才']
};

const SERVER_URL = 'http://ichigo.work:8080/';

const App = () => (
  <div>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Homelo</title>
    </Helmet>

    <BrowserRouter>
      <Link to="/">
        <h1>
          <img src={logo} alt="logo" />
        </h1>
      </Link>
      <hr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={withRouter(HometePost)} />
        <Route path="/homete/:id" component={Homete} />
      </Switch>
    </BrowserRouter>
  </div>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hometes: []
    };
  }

  componentDidMount() {
    axios
      .get(SERVER_URL + 'homete_list')
      .then(results => {
        this.setState({
          hometes: results.data.hometes
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <Link to="/post" className="homete-create-button">
          <i>+</i>
        </Link>

        <ul>
          {this.state.hometes.map((homete, i) => {
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
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ formData }) {
    var id = shortid.generate();
    console.log(id);
    axios
      .post(SERVER_URL + 'create_homete', {
        title: formData.title,
        pin: formData.pin,
        description: formData.description,
        homete_id: id
      })
      .then(response => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
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
  constructor(props) {
    super(props);
    this.state = {
      about_homete: [],
      homents: [],
      homent: ''
    };
  }

  componentDidMount() {
    axios
      .get(SERVER_URL + 'about_homete', {
        params: { homete_id: this.props.match.params.id }
      })
      .then(results => {
        this.setState({
          about_homete: results.data,
          homents: results.data.hometes
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  send_homent() {
    console.log('A');
  }

  render() {
    return (
      <div>
        <h1>{this.state.about_homete.title}</h1>
        <p className="homete-discription">
          {this.state.about_homete.description}
        </p>
        <ul>
          {this.state.homents
            ? this.state.homents.map((homent, i) => {
                return (
                  <div id="homete-button-rapper">
                    <li id="homent" key={i}>
                      <div>
                        <p>{homent}</p>
                      </div>
                    </li>
                  </div>
                );
              })
            : []}
        </ul>
        <div id="form-container">
          <div id="form-rapper">
            <label for="Homent">Homent</label>
            <input
              type="text"
              name="homent"
              value={this.state.homent}
              onChange={e => this.setState({ homent: e.target.valule })}
            />
            <button onClick={() => this.send_homent()}>ほめる</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
