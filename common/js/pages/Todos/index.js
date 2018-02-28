import React, { Component } from 'react';
import { fetchTodos } from '@actions/todos';
import TodosContainer from '@containers/Todos';
// NOTE: To turn on dynamic imports, uncomment this
// import Loadable from 'react-loadable';
// import { Loading } from '@components/common';
// const TodosContainer = Loadable({
//   loader: () => import('../../containers/Todos'),
//   loading: Loading
// });

class TodosPage extends Component {
  static fetchData = ({ store }) => {
    return store.dispatch(fetchTodos());
  };

  render() {
    return <TodosContainer />;
  }
}

export default TodosPage;
