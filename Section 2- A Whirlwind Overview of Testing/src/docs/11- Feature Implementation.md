Your test for verifying that the inputs are emptied after the form is submitted looks good. Below is the detailed explanation and the finalized code snippet for the test.

### `UserForm` Component

Let's ensure that the `UserForm` component clears the inputs upon form submission.

```jsx
import { useState } from 'react';

function UserForm({ onUserAdd }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onUserAdd({ name, email });

    // Clear the inputs after submitting the form
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Enter Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
```

### Test for Clearing Inputs

Here is your test to ensure the inputs are cleared after form submission:

```jsx
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';
import '@testing-library/jest-dom/extend-expect';

test('empties the two inputs when form is submitted', async () => {
  // Render the UserForm component
  render(<UserForm onUserAdd={() => {}} />);

  // Find the input elements and the button
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /add user/i });

  // Simulate user interactions: typing a name and email, then clicking the button
  await user.type(nameInput, 'jane');
  await user.type(emailInput, 'jane@jane.com');
  await user.click(button);

  // Assertions: Check if the inputs are emptied
  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
```

### Explanation

1. **Import Statements**:
    - `import { render, screen } from '@testing-library/react';`: Import functions from React Testing Library for rendering components and querying the DOM.
    - `import user from '@testing-library/user-event';`: Import user-event for simulating user interactions.
    - `import UserForm from './UserForm';`: Import the `UserForm` component to be tested.
    - `import '@testing-library/jest-dom/extend-expect';`: Extend Jest with additional matchers from jest-dom.

2. **Rendering the Component**:
    - `render(<UserForm onUserAdd={() => {}} />);`: Render the `UserForm` component with an empty function as `onUserAdd`.

3. **Finding Elements**:
    - `const nameInput = screen.getByRole('textbox', { name: /name/i });`: Find the name input field using its accessible name.
    - `const emailInput = screen.getByRole('textbox', { name: /email/i });`: Find the email input field using its accessible name.
    - `const button = screen.getByRole('button', { name: /add user/i });`: Find the button using its accessible name.

4. **Simulating User Interactions**:
    - `await user.type(nameInput, 'jane');`: Simulate typing 'jane' into the name input field.
    - `await user.type(emailInput, 'jane@jane.com');`: Simulate typing 'jane@jane.com' into the email input field.
    - `await user.click(button);`: Simulate clicking the button to submit the form.

5. **Assertions**:
    - `expect(nameInput).toHaveValue('');`: Assert that the name input field is emptied after form submission.
    - `expect(emailInput).toHaveValue('');`: Assert that the email input field is emptied after form submission.

This test effectively verifies that the `UserForm` component clears its input fields upon form submission.