import React from 'react'
import ReactDOM from 'react-dom'

import { Card, CardHeader, CardText } from 'material-ui/Card';

import { Tabs, Tab } from 'material-ui/Tabs';

import TestCase from 'components/testcase'

export default class TestRun extends React.Component {

  get testCases() { return this.props.run["test_cases"] ? this.props.run["test_cases"]:[] }
  get testRunId() { return this.props.run["test_run_id"] }
  get appName() { return this.props.run["app_name"] }
  get timeStamp() { return new Date(this.props.run["time_stamp"]).toLocaleString() }

  render() {
    return (
      <div className="testrun">
        <Card>
          <CardHeader
            title={`Test Run ID: ${this.testRunId}`}
            subtitle={`Started: ${this.timeStamp}`}
          />
        </Card>
        <CardText>
          {this.testCases.map((item) => <TestCase case={item} /> )}
        </CardText>
      </div>
    );
  }
};

TestRun.defaultProps = {
  run: {}
}
