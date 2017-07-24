import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, makeSelectable} from 'material-ui/List';


let SelectableList = makeSelectable(List);
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired
    };

    handleRequestChange = (event, index) => {
      this.props.onChoiceSet(index);
    };

    render() {
      return (
        <ComposedComponent
          value={this.props.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default SelectableList;