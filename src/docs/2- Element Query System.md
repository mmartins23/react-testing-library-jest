In Jest, when testing React components, the Element Query System provided by libraries like `@testing-library/react` helps you interact with and query the rendered output of your components. This system allows you to find and interact with elements in a way that mimics how a user would, ensuring that your tests are more reliable and maintainable.

Here are the main aspects of the Element Query System in Jest using `@testing-library/react`:

### 1. **Query Functions**

The query functions provided by `@testing-library/react` allow you to select elements from the DOM. These functions can be categorized based on the types of queries they perform:

#### a. **Single Element Queries**

- **getBy:** Throws an error if no element or more than one element is found. Use these for elements that should always be present.
  ```javascript
  const button = screen.getByRole('button');
  ```

- **queryBy:** Returns `null` if no element is found. Throws an error if more than one element is found. Use these for optional elements.
  ```javascript
  const errorMessage = screen.queryByText('Error');
  ```

#### b. **Multiple Element Queries**

- **getAllBy:** Throws an error if no element is found. Use these for elements that should always be present and might have multiple instances.
  ```javascript
  const buttons = screen.getAllByRole('button');
  ```

- **queryAllBy:** Returns an empty array if no element is found. Use these for optional elements that might have multiple instances.
  ```javascript
  const listItems = screen.queryAllByRole('listitem');
  ```

#### c. **Async Queries**

- **findBy:** Returns a promise that resolves when the element is found or rejects if no element is found after a timeout. Useful for asynchronous operations.
  ```javascript
  const button = await screen.findByRole('button');
  ```

- **findAllBy:** Returns a promise that resolves when the elements are found or rejects if no elements are found after a timeout.
  ```javascript
  const buttons = await screen.findAllByRole('button');
  ```

### 2. **Query Priorities**

The queries are designed with a priority in mind, encouraging tests that are closer to how a user would interact with your application. The priority order is:

1. **Role-based Queries:** Use `getByRole`, `queryByRole`, etc. These queries are preferred as they resemble how screen readers interact with elements.
   ```javascript
   const button = screen.getByRole('button', { name: /submit/i });
   ```

2. **Label Text:** Use `getByLabelText`, `queryByLabelText`, etc. These are used to find form elements associated with labels.
   ```javascript
   const input = screen.getByLabelText('Username');
   ```

3. **Placeholder Text:** Use `getByPlaceholderText`, `queryByPlaceholderText`, etc. These are used to find input elements by their placeholder text.
   ```javascript
   const searchInput = screen.getByPlaceholderText('Search...');
   ```

4. **Text Content:** Use `getByText`, `queryByText`, etc. These are used to find elements by their text content.
   ```javascript
   const linkElement = screen.getByText(/learn react/i);
   ```

5. **Display Value:** Use `getByDisplayValue`, `queryByDisplayValue`, etc. These are used to find form elements by their current value.
   ```javascript
   const input = screen.getByDisplayValue('John Doe');
   ```

6. **Alt Text:** Use `getByAltText`, `queryByAltText`, etc. These are used to find images or other elements by their alt text.
   ```javascript
   const image = screen.getByAltText('Profile Picture');
   ```

7. **Test ID:** Use `getByTestId`, `queryByTestId`, etc. These are used to find elements by a custom data attribute. These are generally less preferred unless other queries are not feasible.
   ```javascript
   const customElement = screen.getByTestId('custom-element');
   ```

### 3. **Example Usage in Jest Test**

Here's an example of how you might use these query functions in a Jest test:

```javascript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the extra matchers
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  // Render the component
  render(<UserForm />);

  // Find the elements
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button', { name: /add user/i });

  // Make sure the component is doing what it's expected
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
```

In this example, the test renders the `UserForm` component and then uses `getAllByRole` to find all elements with the role `textbox` and `getByRole` to find the button with the text "Add user". It then asserts that there are two textboxes and that the button is present in the document.

By using the Element Query System in `@testing-library/react`, you ensure that your tests are more aligned with how users interact with your application, leading to more reliable and maintainable tests.