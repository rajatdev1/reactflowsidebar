import React from 'react';
import styled from 'styled-components';

import { DiagComponentProps } from 'react-flow-diagram';

const EventStyle = styled.div`
  background-color: #fff;
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 77rem;
  border: 2px solid #888;
  justify-content: center;
  font-size: 1.5rem;
`;

const Name = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .5em;
  font-size: 1.4rem;
  width: calc(90%);
  height: calc(90%);
`;

const EditName = styled.textarea`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(95%);
  height: calc(95%);
  padding: 2%;
  border: none;
  border-radius: 50%; 
  font-size: ${props => props.value && props.value.length > 100 ? '1.2rem' : '1.4rem'};
  text-align: center;
  resize: none;
  z-index: 10;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8);
  word-wrap: break-word;
`;

const Event = (props) => (
  <EventStyle width={props.model.width} height={props.model.height}>
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
  </EventStyle>
);

class EventComponent extends React.PureComponent {
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
      <Event
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

export default EventComponent;
