import React, {useState} from 'react';
import styles from './Todos.module.css';

const Todos = () => {
  return (
    <section className={styles.todos}>
      <form className={styles['todos__form']}>
        <label className={styles['todos__form-label']} htmlFor="addTodo">
          What&apos;s your main focus for today?
        </label>
        <input
          className={styles['todos__form-input']}
          type="text"
          name="addTodo"
          id="addTodo"
          autoComplete="off"
        />
      </form>
      <ul className={styles['todos__todo-list']}>
        {/* Hard coded items. Needs replacement. */}
        <li>Buy milk</li>
        <li>Walk the dog</li>
        <li>Learn Redux</li>
        <li>Complete a very complex project</li>
        <li>Learn Redux</li>
        <li>Learn Redux</li>
        <li>Learn Redux</li>
        <li>Learn Redux</li>
      </ul>
    </section>
  );
};

export default Todos;
