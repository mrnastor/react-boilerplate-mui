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
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
// import { loadRepos } from '../App/actions';
// import { changeUsername } from './actions';
// import { makeSelectUsername } from './selectors';
import reducer from './reducer';
// import saga from './saga';

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
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: evt => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//   };
// }

// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

// const mapStateToProps = state => ({
//   angle: state.angle,
// });

// const mapDispatchToProps = dispatch => ({
//   moveObjects: mousePosition => {
//     dispatch(moveObjects(mousePosition));
//   },
// });

export function mapDispatchToProps(dispatch) {
  return {
    moveObjects: mousePosition => {
      dispatch(moveObjects(mousePosition));
    },
    dispatch,
  };
}

// const mapStateToProps = createSelector(makeSelectAngle(), angle => ({
//   angle,
// }));

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
