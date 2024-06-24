In the provided example, we have a `UserForm` component that allows users to enter their name and email, and submit the form to add a user. We also have a test written using Jest and `@testing-library/react` to verify the behavior of this component. Let's break down how querying elements by labels works in this context.

### UserForm Component

Here's the `UserForm` component:

```jsx
import { useState } from 'react';

function UserForm({ onUserAdd }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onUserAdd({ name, email });
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
            <button>Add User</button>
        </form>
    );
}

export default UserForm;
```

### Testing with Jest and `@testing-library/react`

#### Test: it calls onUserAdd when the form is submitted

This test verifies that when the form is submitted with valid inputs, the `onUserAdd` function is called with the correct `name` and `email` values.

```jsx
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it calls onUserAdd when the form is submitted', async () => {
    const mock = jest.fn();  // Create a mock function
    render(<UserForm onUserAdd={mock} />);  // Render the component with the mock function

    // Find the input elements by their labels
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    // Simulate typing in a name and email
    await user.type(nameInput, 'jane');
    await user.type(emailInput, 'jane@jane.com');

    // Find the submit button
    const button = screen.getByRole('button', { name: /add user/i });

    // Simulate clicking the button to submit the form
    await user.click(button);

    // Assertions to check if onUserAdd was called with the correct values
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });
});
```

**Explanation:**

1. **Rendering the Component:**
   - `render(<UserForm onUserAdd={mock} />);`: Renders the `UserForm` component with a mock function `mock` passed as the `onUserAdd` prop.

2. **Querying Elements by Labels:**
   - `screen.getByLabelText(/name/i);` and `screen.getByLabelText(/email/i);`: These functions from `@testing-library/react` locate form elements by their associated `<label>` text. The `/name/i` and `/email/i` are regular expressions used to match case-insensitively against the labels "Name" and "Enter Email" respectively.

3. **Simulating User Interaction:**
   - `await user.type(nameInput, 'jane');` and `await user.type(emailInput, 'jane@jane.com');`: Using `@testing-library/user-event`, these simulate typing 'jane' into the name and email input fields.

4. **Finding and Clicking the Button:**
   - `screen.getByRole('button', { name: /add user/i });`: Finds the button element by its role (`button`) and its accessible name (`Add User`).
   - `await user.click(button);`: Simulates clicking the button.

5. **Assertions:**
   - `expect(mock).toHaveBeenCalled();`: Verifies that the `mock` function (`onUserAdd`) was called at least once.
   - `expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });`: Checks that the `mock` function was called with the expected arguments (`name: 'jane'` and `email: 'jane@jane.com'`).

### Summary

- **Querying Elements by Labels:** Using `screen.getByLabelText` from `@testing-library/react` allows us to find form elements based on their associated `<label>` text, which is beneficial for accessibility.
- **Testing with Jest and `@testing-library/react`:** Tests are structured to simulate user interactions and verify expected behaviors, ensuring that the `UserForm` component works correctly.

By leveraging these testing techniques, you can confidently validate the functionality of React components, ensuring they behave as expected when used by real users.