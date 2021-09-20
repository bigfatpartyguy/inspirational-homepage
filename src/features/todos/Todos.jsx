import React, {useState} from 'react';
import Button from '../../common/Button';
import styles from './Todos.module.css';
import {MdDone, MdClear} from 'react-icons/md';

const Todos = () => {
  const [inputVal, setInputVal] = useState('');

  const handleChange = ({target: {value}}) => {
    setInputVal(value);
  };

  return (
    <section className={styles.todos}>
      <form className={styles['todos__form']}>
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
        {/* Hard coded items. Need replacement. */}
        {['Buy milk', 'Walk the dog', 'Complete a very important project'].map(
          (todo, key) => {
            return (
              <li key={key}>
                {todo}
                <span
                  className={`${styles['todos__done-button']} ${styles['todos__list-button']}`}
                >
                  <Button className="todo_completed">
                    <MdDone />
                  </Button>
                </span>
                <span
                  className={`${styles['todos__clear-button']} ${styles['todos__list-button']}`}
                >
                  <Button className="todo_clear">
                    <MdClear />
                  </Button>
                </span>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};

export default Todos;
