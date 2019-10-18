import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './context/theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css'
import Main from './components/Main';
import Battle from './components/Battle';
import Results from './components/Results';
import Nav from './components/Nav';


class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        theme: 'light',
        toggleTheme: () => {
          console.log('toggle btn clicked');
          this.setState( ({ theme }) => ({
            theme: theme === 'light' ? 'dark' : 'light'
          }));
        }
      }
    }
    render() {
      console.log(this.state.theme);
        return(
          <Router>
            <ThemeProvider value={this.state}>
              <div className={this.state.theme}>
                <div className="container">
                  <Nav />
                  <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/battle" component={Battle} />
                    <Route path="/battle/results" component={Results} />
                    <Route>
                      {() => (
                        <h1>404: Not Found</h1>
                      )}
                    </Route>
                  </Switch>
                </div>
              </div>
            </ThemeProvider>
          </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

