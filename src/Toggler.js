import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class Toggler extends React.Component {
  constructor(props) {
    super(props);
    this.positiveClick = this.positiveClick.bind(this);
    this.negativeClick = this.negativeClick.bind(this);
  }

  positiveClick(event) {
    this.props.onToggle(true);
  }

  negativeClick(event) {
    this.props.onToggle(false);
  }

  render() {
    if (this.props.isPositive) {
      return (
        <Button.Group fluid>
          <Button onClick={this.positiveClick} color='green' icon>
            <Icon name = 'plus'/>
          </Button>
          <Button onClick={this.negativeClick} icon>
            <Icon name = 'minus'/>
          </Button>
        </Button.Group>
      )
    }

    return (
      <Button.Group fluid>
        <Button onClick={this.positiveClick} icon>
          <Icon name = 'plus'/>
        </Button>
        <Button onClick={this.negativeClick} color='red' icon>
          <Icon name = 'minus'/>
        </Button>
      </Button.Group>
    )
  }
}