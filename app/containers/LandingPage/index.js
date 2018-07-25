/**
 * Landing Page
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';

import Img from './Img';

import SuperStudyLogo from './super_study_logo.png';

export default class LandingPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  handleOnClick = () => {
    // some action...
    // then redirect
    // this.setState({redirect: true});
    this.context.router.history.push(`/features`);
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect push to="/features" />;
    // }

    return (
      <article>
        <Img src={SuperStudyLogo} alt="Super Study Logo" />
        <button onClick={this.handleOnClick}> Start</button>
      </article>
    );
  }
}
