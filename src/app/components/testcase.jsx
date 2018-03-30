import React from 'react'
import ReactDOM from 'react-dom'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import { red50, green50, green100, red100, red800, green800, grey300, grey900 } from 'material-ui/styles/colors'

import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import AvReplay from 'material-ui/svg-icons/av/replay';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TestStep from 'components/teststep'

export default class TestCase extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.defaultState
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleExpandChange = this.handleExpandChange.bind(this)
  }

  get defaultState() {
    let defaultState = {
      stepIndex: 0,
      expanded: false,
    }
    return defaultState
  }

  get testName() { return this.props.case["test_name"] }
  get status() { return this.props.case["status"] }
  get statusString() { return this.props.case["status"] ? <span style={{color: green800}}>Pass</span>:<span style={{color: red800}}>Fail</span> }
  get testSteps() { return this.props.case["test_steps"] }
  get finished() { return this.state.stepIndex >= this.testSteps.length - 1 }

  handleNext() {
    if (this.finished) {
      this.setState({ stepIndex: 0 })
    } else {
      this.setState({ stepIndex: this.state.stepIndex + 1 })
    }
  }

  handlePrev() {
    if (this.state.stepIndex > 0) {
      this.setState({ stepIndex: this.state.stepIndex - 1 })
    }
  }

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded });
  }

  getTestStep(stepIndex) {
    return <TestStep step={this.testSteps[stepIndex]} index={stepIndex + 1} />
  }

  getStep(step) {
    return <Step><StepLabel>{step["step_name"]}</StepLabel></Step>
  }

  render() {
    const {stepIndex, expanded} = this.state

    return (
      <Card expanded={expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.testName}
          subtitle={this.statusString}
          avatar={expanded ? <AvPlayCircleFilled />:<AvPlayCircleOutline />}
          actAsExpander={true}
          style={{backgroundColor: this.status ? green100:red100}} />
        <CardActions expandable={true}>
          <FlatButton
            icon={<AvSkipPrevious color={stepIndex === 0 ? grey300:grey900} />}
            disabled={stepIndex === 0}
            onClick={this.handlePrev} />
          <RaisedButton
            icon={this.finished ? <AvReplay />:<AvSkipNext />}
            primary={true}
            onClick={this.handleNext} />
        </CardActions>
        <Stepper activeStep={stepIndex} style={{backgroundColor: this.status ? green50:red50}}>
          {this.testSteps.map(this.getStep)}
        </Stepper>
        <CardText expandable={true}>
          {this.getTestStep(stepIndex)}
        </CardText>
      </Card>
    );
  }
};

TestCase.defaultProps = {
  case: {}
}