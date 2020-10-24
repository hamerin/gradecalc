import React from 'react'
import {Form, Label, Input} from 'semantic-ui-react'
import Toggler from './Toggler'

function escapeNaN(x) {
  return isNaN(x) ? 0 : x;
}

export default class PartialScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isPositive: true, score: 0}
    this.onToggle = this.onToggle.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.onRatioChange = this.onRatioChange.bind(this);
  }

  calcScore() {
    const scoreViewed = escapeNaN(this.state.score);
    const ratioViewed = escapeNaN(this.props.ratio);
    const maxScoreViewed = escapeNaN(this.props.maxScore);
    const score = this.state.isPositive ? scoreViewed : (maxScoreViewed - scoreViewed);
    return ratioViewed * score / this.props.maxScore;
  }

  onToggle(value) {
    this.setState({isPositive: value});
  }

  onScoreChange(event) {
    this.setState({score: parseFloat(event.target.value)});
  }

  onRatioChange(event) {
    this.props.onRatioChange(parseFloat(event.target.value));
  }

  componentDidUpdate(prevProps, prevState) {
    if(isNaN(this.props.ratio) || isNaN(this.state.score)) return;

    if(this.props.ratio !== prevProps.ratio
    || this.state.isPositive !== prevState.isPositive
    || this.state.score !== prevState.score) {
      this.props.updateScore(this.calcScore());
    }
  }

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>{this.props.name}</label>
            <Toggler isPositive={this.state.isPositive} onToggle={this.onToggle} />
          </Form.Field>
          <Form.Input label='점수' value={this.state.score} type="number" onChange={this.onScoreChange}/>
          <Form.Field>
            <label>반영 비율</label>
            <Input labelPosition='right'  value={this.props.ratio} type="number" onChange={this.onRatioChange}>
              <input />
              <Label>%</Label>
            </Input>
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}