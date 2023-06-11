import {Provider} from 'react-redux';
import {store} from '../../app/store';
import Todos from './Todos';
import userEvent from '@testing-library/user-event';
import {render} from '@testing-library/react';

test('Renders a ToDo component with input and label', () => {
  const {getByLabelText} = render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );
  const input = getByLabelText(/What's your main focus for today\?/i);
  expect(input).toHaveAttribute('type', 'text');
});

test('Can add a todo with complete and clear buttons', async () => {
  const user = userEvent.setup();
  const {getByTestId} = render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );
  const form = getByTestId('todo-form');
  const input = form.elements.addTodo;
  await user.type(input, 'Buy milk');
  await user.keyboard('[Enter]');
  const todo = getByTestId('todo');
  const completeBtn = todo.querySelector('.todo_complete');
  const clearBtn = todo.querySelector('.todo_clear');
  expect(todo).toHaveTextContent('Buy milk');
  expect(todo).toContainElement(completeBtn);
  expect(todo).toContainElement(clearBtn);
});

test('Can mark a todo as completed', async () => {
  const user = userEvent.setup();
  const {getByTestId} = render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );
  const todo = getByTestId('todo');
  const completeBtn = todo.querySelector('.todo_complete');
  await user.click(completeBtn);
  expect(todo).toHaveClass('todos__list-item_completed');
});

test('Can delete a todo', async () => {
  const user = userEvent.setup();
  const {getByTestId} = render(
    <Provider store={store}>
      <Todos />
    </Provider>
  );
  const todos = getByTestId('todos');
  const todo = getByTestId('todo');
  const clearBtn = todo.querySelector('.todo_clear');
  await user.click(clearBtn);
  expect(todos).not.toContainElement(todo);
});
