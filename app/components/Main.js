import React from 'react';
import PropTypes from 'prop-types';

import { fetchPopularRepos } from '../utilities/api';

import LanguageNav from './LanguageNav';
import ReposGrid from './ReposGrid';
import Loading from './Loading';


class Main extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage: selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(
          (data) => {
            this.setState(({ repos }) => ({
              repos: {
                ...repos,
                [selectedLanguage]: data
              }
            }));
          }
        )
        .catch((error) => {
          console.warn('Error fetching repos', error);

          this.setState({ error })
        });;

    }

  }

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {

    const languages = ['All', 'HTML', 'CSS', 'Javascript', 'PHP', 'C#'];
    const { selectedLanguage, repos, error } = this.state;
    console.log(repos);

    return (
      <React.Fragment>
        <LanguageNav
          languages={languages}
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text='Fetching Repos' speed={200 } />}

        {error && <h2 className="error center-text">ERROR</h2>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}



      </React.Fragment>
    );
  }
}

LanguageNav.propTypes = {
  languages: PropTypes.array.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

ReposGrid.proptype = {
  repos: PropTypes.array.isRequired
}

export default Main;
