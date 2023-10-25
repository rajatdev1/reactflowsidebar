import React from 'react';
import styled from 'styled-components';
import { DiagComponentProps } from 'react-flow-diagram';

const TaskStyle = styled.div`
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: ${props => (props.isEditing ? 'stretch' : 'center')};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border: 2px solid #888;
  font-size: 1.4rem;
`;

const Name = styled.span`
  flex: 1 0;
  padding: .5em;
  font-size: 1.4rem;
`;

const EditName = styled.textarea`
  padding: .5em;
  font-size: 1.4rem;
  text-align: center;
  resize: none;
  border: none;
  border-radius: .5rem;
`;

const Task = (props) => (
  <TaskStyle
    width={props.model.width}
    height={props.model.height}
    isEditing={props.isEditing}
  >
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      ref={textarea => props.handleRef(textarea)}
      style={{ display: props.isEditing ? 'block' : 'none' }}
    />
    <Name
      onDoubleClick={() => props.toggleEdit(true)}
      style={{ display: !props.isEditing ? 'block' : 'none' }}
    >
      {props.model.name}
    </Name>
  </TaskStyle>
);

class TaskComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: props.model.name,
    };
    this.textarea = null;
  }

  componentWillUnmount() {
    this.textarea = null;
  }

  handleRef = (textarea) => {
    if (!this.textarea) {
      this.textarea = textarea;
    }
  };

  toggleEdit = (isEditing) => {
    if (isEditing && this.textarea) {
      setTimeout(() => this.textarea.focus(), 16 * 4);
    }
    this.setState({ isEditing });
  };

  refreshName = (ev) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (ev) => {
    switch (ev.key) {
      case 'Enter':
        this.toggleEdit(false);
        this.props.setName({ id: this.props.model.id, name: this.state.name });
        break;
      case 'Escape':
        this.toggleEdit(false);
        this.setState({ name: this.props.model.name });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Task
        {...this.props}
        isEditing={this.state.isEditing}
        name={this.state.name}
        toggleEdit={this.toggleEdit}
        refreshName={this.refreshName}
        handleKeyPress={this.handleKeyPress}
        handleRef={this.handleRef}
      />
    );
  }
}

export default TaskComponent;
