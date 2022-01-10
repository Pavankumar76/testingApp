import React from 'react';
import App from '../App';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

it('should create item', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addItemButton = getByText('+');
  const textInput = getByPlaceholderText('Write something');
  const createdItemText = 'Learn ReactNative';
  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addItemButton);
  const createdItem = getByText(createdItemText);

  expect(createdItem).not.toBeNull();
});

it('should create multiple item', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addItemButton = getByText('+');
  const textInput = getByPlaceholderText('Write something');

  const createdItemText = 'Learn ReactNative';
  const createdItemText_2 = 'Learning ReactNavigation';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addItemButton);

  fireEvent.changeText(textInput, createdItemText_2);
  fireEvent.press(addItemButton);

  const firstcreatedItem = getByText(createdItemText);
  const secondcreatedItem = getByText(createdItemText_2);

  expect(firstcreatedItem).not.toBeNull();
  expect(secondcreatedItem).not.toBeNull();
});
it('should delete item', () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<App />);

  const addItemButton = getByText('+');
  const textInput = getByPlaceholderText('Write something');

  const createdItemText = 'Learn ReactNative';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addItemButton);

  const deleteItemButton = getByText('X');

  fireEvent.press(deleteItemButton);

  const deletedItem = queryByText(createdItemText);

  expect(deletedItem).toBeNull();
});
it('should display error message while creating item with out text', () => {
  const { getByText } = render(<App />);

  const addItemButton = getByText('+');

  fireEvent.press(addItemButton);

  const errorMessage = getByText('Please insert a valid text');

  expect(errorMessage).not.toBeNull();
});
it('should remove error after entering the text', () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<App />);

  const addItemButton = getByText('+');

  fireEvent.press(addItemButton);

  const textInput = getByPlaceholderText('Write something');
  const createdItemText = 'Learn ReactNative';
  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addItemButton);

  const errorMessage = queryByText('Please insert a valid text');

  expect(errorMessage).toBeNull();
});
it('App snapshot', () => {
  const snapshot = renderer.create(<App />).toJSON();
  expect(snapshot).toMatchSnapshot();
});
