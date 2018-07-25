/*
 * Game
 *
 * ...as the name implies
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError,
// } from 'containers/App/selectors';
import Canvas from 'components/Canvas';
import reducer from './reducer';

import { getCanvasPosition } from '../../utils/formulas';
import { moveObjects } from './actions';
import { makeSelectAngle } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class Game extends React.PureComponent {
  componentDidMount() {
    const self = this;
    this.timerID = setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        trackMouse={event => this.trackMouse(event)}
      />
    );
  }
}

Game.propTypes = {
  angle: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    moveObjects: mousePosition => {
      dispatch(moveObjects(mousePosition));
    },
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  angle: makeSelectAngle(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'game', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(Game);
