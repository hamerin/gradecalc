import React from 'react'
import { Header, Segment, Table, Button } from 'semantic-ui-react'
import PartialScore from './PartialScore'

export default class Subject extends React.Component {
  constructor(props) {
    super(props);
    
    this.updatePerScore = this.updatePerScore.bind(this);
    this.onPerRatioChange = this.onPerRatioChange.bind(this);
  
    this.updateMidScore = this.updateMidScore.bind(this);
    this.onMidRatioChange = this.onMidRatioChange.bind(this);

    this.state = {
      perMaxScore: 100,
      perRatio: 100,
      perScore: 0,
      midMaxScore: 100,
      midRatio: 0,
      midScore: 0,
    }
  }

  updatePerScore(value) {
    this.setState({perScore: value});
  }

  onPerRatioChange(value) {
    this.setState({perRatio: value, perMaxScore: value, midRatio: (100-value)/2})
  }
  
  updateMidScore(value) {
    this.setState({midScore: value});
  }

  onMidRatioChange(value) {
    this.setState({midRatio: value})
  }

  render() {
    const totalScore = this.state.perScore + this.state.midScore;
    const finalRatio = 100 - this.state.perRatio - this.state.midRatio;
    const items = [90, 85, 80, 75, 70]
                  .map((x) => (x - totalScore) / finalRatio * 100)
                  .map((x) => {
                    if(x < 0) x = 0;
                    if(x > 100) return [true, false, false, "INF"];

                    let w = this.state.midScore * 100 < x * this.state.midRatio
                    return [false, w, !w, x.toFixed(1)];
                  })
                  .map((arr, idx) => (
                    <Table.Cell key={idx} negative={arr[0]} warning={arr[1]} positive={arr[2]}>{arr[3]}</Table.Cell>
                  ))

    return (
      <div className="subject">
        <Header as='h5' attached='top'>
          {this.props.name}
        </Header>
        <Segment attached>
          <PartialScore name="수행평가"
                        onRatioChange={this.onPerRatioChange}
                        updateScore={this.updatePerScore}
                        maxScore={this.state.perMaxScore}
                        ratio={this.state.perRatio}/>
          <PartialScore name="중간고사"
                        onRatioChange={this.onMidRatioChange}
                        updateScore={this.updateMidScore}
                        maxScore={this.state.midMaxScore}
                        ratio={this.state.midRatio}/>
          <Table celled unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>A+</Table.HeaderCell>
                <Table.HeaderCell>A0</Table.HeaderCell>
                <Table.HeaderCell>A-</Table.HeaderCell>
                <Table.HeaderCell>B+</Table.HeaderCell>
                <Table.HeaderCell>B0</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                {items}
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Button attached='bottom' content="과목 삭제" onClick={this.props.onDelete}/>
      </div>
    )
  }
}