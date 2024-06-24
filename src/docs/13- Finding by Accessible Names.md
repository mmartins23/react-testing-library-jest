Let's go through the example of how to find elements by their accessible names in a React component using React Testing Library.

### Component and Test Case

#### AccessibleName Component

```javascript
import { render, screen } from '@testing-library/react';

function AccessibleName() {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
}
```

This component renders a `div` containing two `button` elements with the text "Submit" and "Cancel".

#### Test Case: Selecting by Accessible Name

```javascript
test('can select by accessible name', () => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole('button', {
    name: /submit/i
  });
  const cancelButton = screen.getByRole('button', {
    name: /cancel/i
  });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});
```

### Explanation

1. **Rendering the Component**:
   - `render(<AccessibleName />);`: This function renders the `AccessibleName` component within the testing environment.

2. **Querying by Role and Accessible Name**:
   - `screen.getByRole('button', { name: /submit/i })`: This function queries the DOM for a `button` element whose accessible name matches "Submit". The `/submit/i` is a regular expression that makes the search case-insensitive.
   - `screen.getByRole('button', { name: /cancel/i })`: Similarly, this queries for a `button` element with the accessible name "Cancel".

3. **Assertions**:
   - `expect(submitButton).toBeInTheDocument();`: This assertion checks that the button with the accessible name "Submit" is present in the document.
   - `expect(cancelButton).toBeInTheDocument();`: This checks that the button with the accessible name "Cancel" is present in the document.

### Key Concepts

- **Accessible Name**: The name of an element that is exposed to assistive technologies. It can be derived from different sources like inner text, `aria-label`, `aria-labelledby`, etc. In this example, the accessible names are the inner texts "Submit" and "Cancel".
- **Querying by Role**: Using `getByRole`, you can query elements by their role, making your tests more robust and closer to how users interact with your application. Roles are standard across HTML elements, making the queries less prone to breakage if the implementation details of the component change.
- **Regular Expressions**: Using regular expressions (e.g., `/submit/i`) in queries allows for flexible and case-insensitive matching.

### Benefits of This Approach

- **Accessibility**: Ensures the elements can be identified in ways that assistive technologies will use, promoting better accessibility.
- **Readability**: Tests are easier to read and understand because they query elements in a way that describes their role and accessible name.
- **Maintainability**: Less likely to break if the structure of the component changes but the roles and accessible names remain the same.

By focusing on roles and accessible names, you ensure your tests are both robust and reflective of real user interactions, improving the quality and reliability of your application.