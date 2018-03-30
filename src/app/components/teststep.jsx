import React from 'react'
import ReactDOM from 'react-dom'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { green800, red800 } from 'material-ui/styles/colors'

export default class TestStep extends React.Component {

  constructor(props) {
    super(props)
  }

  get testName() { return this.props.step["step_name"] }
  get screenshot() { return "images/" + this.props.step["screenshot"] }
  get launchTimes() { return this.props.step["launch_times"] }
  get memory() { return this.props.step["memory"] }
  get cpu() { return this.props.step["cpu"] }
  get changes() {
    let results = {}
    results["launch_times"] = this.change(this.launchTimes)
    results["memory"] = this.change(this.memory)
    results["cpu"] = this.change(this.cpu)
    return results
  }

  change(data) {
    let results = []
    let prev_value = null
    for (let item of data) {
      if (prev_value && item) {
        const percent_change = (((item - prev_value) / prev_value) * 100).toFixed(2)
        results.push(<span style={{color: percent_change >= 0 ? green800:red800}}>
          ({(percent_change >= 0 ? "+":"-") + percent_change + "%"})
        </span>)
      } else {
        prev_value = item
      }
    }
    return results
  }

  testStepRows(i) {
    return (
      <TableRow>
        <TableRowColumn>{i + 1}</TableRowColumn>
        <TableRowColumn>{this.launchTimes[i]} ms <small>{i > 0 ? this.changes["launch_times"][i - 1]:''}</small></TableRowColumn>
        <TableRowColumn>{this.memory[i]} MB <small>{i > 0 ? this.changes["memory"][i - 1]:''}</small></TableRowColumn>
        <TableRowColumn>{this.cpu[i]}% <small>{i > 0 ? this.changes["cpu"][i - 1]:''}</small></TableRowColumn>
      </TableRow>
    )
  }

  render() {
    return (
      <div className="teststep">
        <img className="screenshot" src={ this.screenshot } />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Run</TableHeaderColumn>
              <TableHeaderColumn>Launch Times</TableHeaderColumn>
              <TableHeaderColumn>Memory</TableHeaderColumn>
              <TableHeaderColumn>CPU</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.launchTimes.map((item, i) => this.testStepRows(i)) }
          </TableBody>
        </Table>
      </div>
    );
  }
};

TestStep.defaultProps = {
  step: {}
}