import React from 'react';
import PropTypes from 'prop-types';
import { List, Checkbox, Button } from 'semantic-ui-react';
import classnames from 'classnames/bind';
import css from './index.scss';

const cx = classnames.bind(css);

const TodoItem = props => {
  const { onRemove, onChange, todo: { id, completed, text } } = props;

  return (
    <List.Item className={classnames(css.todo, css.extra)}>
      <List.Content floated="right">
        <Button onClick={() => onRemove(id)} icon="remove" size="mini" />
      </List.Content>
      <List.Content floated="left">
        <Checkbox
          type="checkbox"
          checked={completed}
          onChange={() => onChange(id)}
        />
      </List.Content>
      <List.Content className={cx(css.text, { [css.completed]: completed })}>
        {text}
      </List.Content>
    </List.Item>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onChange: PropTypes.func
};

TodoItem.defaultProps = {
  onRemove: () => {},
  onChange: () => {}
};

export default TodoItem;
