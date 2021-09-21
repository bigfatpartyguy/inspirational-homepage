import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {selectTodos, addTodo, removeTodo, markAsCompleted} from './todosSlice';
import Button from '../../common/Button';
import styles from './Todos.module.css';
import {MdDone, MdClear} from 'react-icons/md';
import classNames from 'classnames';

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [inputVal, setInputVal] = useState('');

  const clearBtnClassNames = classNames(
    styles['todos__clear-button'],
    styles['todos__list-button']
  );

  const doneBtnClassNames = classNames(
    styles['todos__done-button'],
    styles['todos__list-button']
  );

  const handleSubmnit = evt => {
    evt.preventDefault();
    const todo = {
      value: inputVal,
      id: uuidv4(),
      completed: false,
    };
    dispatch(addTodo(todo));
    setInputVal('');
  };

  const handleRemove = id => {
    dispatch(removeTodo(id));
  };

  const handleChange = ({target: {value}}) => {
    setInputVal(value);
  };

  const handleCompleted = id => {
    dispatch(markAsCompleted(id));
  };

  return (
    <section className={styles.todos}>
      <form className={styles['todos__form']} onSubmit={handleSubmnit}>
        <label className={styles['todos__form-label']} htmlFor="addTodo">
          What&apos;s your main focus for today?
        </label>
        <input
          className={styles['todos__form-input']}
          value={inputVal}
          onChange={handleChange}
          type="text"
          name="addTodo"
          id="addTodo"
          autoComplete="off"
        />
      </form>
      <ul className={styles['todos__todo-list']}>
        {todos.map(todo => {
          const listItemClassNames = classNames(
            styles['todos__list-item'],
            styles[todo.completed && 'todos__list-item_completed']
          );
          return (
            <li className={listItemClassNames} key={todo.id}>
              {todo.value}
              {!todo.completed && (
                <span className={doneBtnClassNames}>
                  <Button
                    className="todo_completed"
                    onClick={() => handleCompleted(todo.id)}
                  >
                    <MdDone />
                  </Button>
                </span>
              )}
              <span className={clearBtnClassNames}>
                <Button
                  className="todo_clear"
                  onClick={() => handleRemove(todo.id)}
                >
                  <MdClear />
                </Button>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Todos;
