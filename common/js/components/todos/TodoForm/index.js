import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import css from './index.scss';

class TodoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    className: PropTypes.string
  };

  state = { todoText: '' };

  submitTodo = ev => {
    ev.preventDefault();

    const { onSubmit } = this.props;
    const { todoText } = this.state;

    if (todoText && todoText !== '' && typeof onSubmit === 'function') {
      onSubmit(todoText);
      this.setState({ todoText: '' });
    }
  };

  onTodoChange = ev => {
    this.setState({ todoText: ev.target.value });
  };

  render() {
    const { className } = this.props;
    const { todoText } = this.state;

    return (
      <Form
        className={classnames(css.todoForm, className)}
        onSubmit={this.submitTodo}
      >
        <Form.Group>
          <Form.Input
            onChange={this.onTodoChange}
            value={todoText}
            type="text"
            placeholder="Add a todo..."
          />
          <Form.Button content="Add" icon="plus" />
        </Form.Group>
      </Form>
    );
  }
}

export default TodoForm;
