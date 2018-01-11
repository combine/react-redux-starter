import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as actions from 'actions/todos';
import { Container } from 'semantic-ui-react';
import { TodoList, TodoForm } from 'components/todos';

class TodosContainer extends Component {
  static fetchData = ({ store }) => {
    return store.dispatch(actions.fetchTodos());
  };

  static propTypes = {
    todos: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, todos: { isFetched } } = this.props;

    if (!isFetched) {
      dispatch(actions.fetchTodos());
    }
  }

  submitTodo = text => {
    const { dispatch } = this.props;

    if (text) {
      dispatch(actions.addTodo(text));
    }
  };

  checkTodo = id => {
    const { dispatch } = this.props;

    dispatch(actions.toggleTodo(id));
  };

  removeTodo = id => {
    const { dispatch } = this.props;

    dispatch(actions.removeTodo(id));
  };

  render() {
    const { todos } = this.props;
    const title = 'Todo List';

    return (
      <Container>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <TodoList
          todos={todos}
          onRemove={this.removeTodo}
          onChange={this.checkTodo}
        />
        <TodoForm onSubmit={this.submitTodo} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(TodosContainer);
