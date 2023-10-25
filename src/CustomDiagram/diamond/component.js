
import React from 'react';
import style from 'styled-components';

const DiamondStyle = style.div`
  background-color: #fff;
  display: flex;
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  font-size: 1.5rem;
  border: 2px solid #888;

  overflow: hidden;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  border: 2px solid #000; /* Add a 2px border around the diamond */
  cursor: nwse-resize;
`;

const dynamicFontSize = (textLength) => {
    if (textLength < 20) return '1.4rem';
    if (textLength < 50) return '1.2rem';
    if (textLength < 100) return '1rem';
    if (textLength < 200) return '0.8rem';
    return '0.6rem'; // for really long text
  };
  


const Name = style.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .5em;
  font-size: 1.4rem;
`;

const EditName = style.textarea`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(98%); 
  height: calc(98%);
  padding: 1%; 
  border: none;
  border-radius: 50%; 
  font-size: ${props => dynamicFontSize(props.value.length)}; 
//   font-size: ${props => props.fontSize || '1.4rem'};
  text-align: center;
  align-items: center;
  resize: none;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  word-wrap: break-word;
  overflow-wrap: break-word; // important to break long words
`;


const Diamond = (props) => (
  <DiamondStyle width={props.model.width} height={props.model.height}>
    <EditName
      value={props.name}
      onChange={props.refreshName}
      fontSize={props.fontSize}
      onKeyDown={props.handleKeyPress}
    //   ref={textarea => props.handleRef(textarea)}
      style={{ display: props.isEditing ? 'block' : 'none' }}
      ref={this.handleRef}

    />
    <Name
      onDoubleClick={() => props.toggleEdit(true)}
      style={{ display: !props.isEditing ? 'block' : 'none' }}
    >
      {props.model.name}
    </Name>
  </DiamondStyle>
);



class App extends React.Component {
  state = {
    model: {
      id: 1,
      name: "Sample Name",
      width: 100,
      height: 100
    }
  };

  updateModelSize = (updatedModel) => {
    this.setState(prevState => ({
      model: {
        ...prevState.model,
        width: updatedModel.width,
        height: updatedModel.height
      }
    }));
  };

  render() {
    return (
      <div>
        <DiamondComponent 
          model={this.state.model}
          updateModelSize={this.updateModelSize} // Pass the method as a prop
        />
      </div>
    );
  }
}




class DiamondComponent extends React.PureComponent {
  state = {
    isEditing: false,
    name: this.props.model.name,
    dragging: false,
    initialX: 0,
    initialY: 0,
  }
  textarea = null; // Initialize as class property

  handleRef = (textarea) => {
    this.textarea = textarea;
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


  handleMouseDown = (e) => {
    this.setState({ dragging: true, initialX: e.clientX, initialY: e.clientY });
  };
  
  handleMouseUp = () => {
    this.setState({ dragging: false });
  };
  
  handleMouseMove = (e) => {
    if (!this.state.dragging) return;
  
    const deltaX = e.clientX - this.state.initialX;
    const deltaY = e.clientY - this.state.initialY;
  
    const newWidth = this.props.model.width + deltaX;
    const newHeight = this.props.model.height + deltaY;
  
    // Update the model size here, you may want to have a callback 
    // or handle it depending on your application's state management.
    // For simplicity, I'll use a callback:
    this.props.updateModelSize({ id: this.props.model.id, width: newWidth, height: newHeight });
  
    this.setState({ initialX: e.clientX, initialY: e.clientY });
  };
  

  updateModelSize = (updatedModel) => {
    this.setState(prevState => ({
      models: prevState.models.map(model => 
        model.id === updatedModel.id ? { ...model, ...updatedModel } : model
      )
    }));
  };



  render() {
    const fontSize = dynamicFontSize(this.state.name.length);

    return (
        <Diamond
             onMouseDown={this.handleMouseDown}
             onMouseMove={this.handleMouseMove}
             onMouseUp={this.handleMouseUp}
            model={this.props.model}
            isEditing={this.state.isEditing}
            name={this.state.name}
            toggleEdit={this.toggleEdit}
            refreshName={this.refreshName}
            handleKeyPress={this.handleKeyPress}
            handleRef={this.handleRef}
            fontSize={fontSize}
        />
    );
}

}

export default DiamondComponent;
