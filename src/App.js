import React from 'react'
import { Container, Form } from 'semantic-ui-react'
import Subject from './Subject'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {subjectList: [], subjectName: ""};

    this.addSubject = this.addSubject.bind(this);
    this.removeSubject = this.removeSubject.bind(this);
    this.updateSubjectName = this.updateSubjectName.bind(this);
  }

  addSubject(event) {
    event.preventDefault();

    const id = Date.now();
    let subjectList = [<Subject key={id} id={id} name={this.state.subjectName} onDelete={() => this.removeSubject(id)}/>, ...this.state.subjectList];
    
    this.setState({subjectList: subjectList, subjectName: ""});
  }

  removeSubject(id) {
    this.setState({subjectList: this.state.subjectList.filter(elem => elem.props.id !== id)});
  }

  updateSubjectName(event) {
    this.setState({subjectName: event.target.value});
  }

  render() {
    return (
      <Container>
        <Form style={{marginTop: "2.5em"}}>
          <Form.Group unstackable widths={2}>
            <Form.Input fluid placeholder='과목명' value={this.state.subjectName} onChange={this.updateSubjectName} width={12} />
            <Form.Button fluid primary content='추가' onClick={this.addSubject} width={4}/>
          </Form.Group>
        </Form>
        {this.state.subjectList}
      </Container>
    )
  }
}