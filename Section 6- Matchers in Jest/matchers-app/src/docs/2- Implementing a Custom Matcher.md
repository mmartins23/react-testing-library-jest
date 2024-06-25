### Matchers in React Testing Library with Jest

Matchers in Jest and React Testing Library are used to assert that the values and behaviors in your tests are what you expect them to be. A project generated by Create React App has access to all the matchers included in Jest, as well as additional matchers defined in the `@testing-library/jest-dom` package.

### Example: Testing the FormData Component

In this example, we'll walk through testing a `FormData` component to ensure it behaves as expected using Jest matchers and a custom matcher.

#### Component: FormData

Here is the `FormData` component that we will test. It includes a div with a form containing two buttons: Save and Cancel.

```javascript
import { screen, render, within } from '@testing-library/react';

function FormData() {
  return (
    <div>
      <button>Go Back</button>
      <form aria-label="form">
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}

render(<FormData />);
```

### Using Custom Matchers

In addition to the built-in matchers, you can create custom matchers to make your tests more expressive and reusable.

#### Custom Matcher: toContainRole

The custom matcher `toContainRole` checks if a specified container contains a specified number of elements with a given role.

```javascript
function toContainRole(container, role, quantity = 1) {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () => `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`,
  };
}

expect.extend({ toContainRole });
```

#### Test: Verifying Buttons in the Form

The test checks if the `FormData` component's form contains exactly two buttons using the custom matcher `toContainRole`.

```javascript
test('the form displays two buttons', () => {
  render(<FormData />);

  const form = screen.getByRole('form');

  expect(form).toContainRole('button', 2);
});
```

### Detailed Explanation

1. **Rendering the Component:**
   ```javascript
   render(<FormData />);
   ```
   - The `render` function from `@testing-library/react` renders the `FormData` component in a virtual DOM.

2. **Querying the DOM:**
   ```javascript
   const form = screen.getByRole('form');
   ```
   - The `screen.getByRole` method finds the form element by its role attribute.

3. **Using Custom Matcher:**
   ```javascript
   expect(form).toContainRole('button', 2);
   ```
   - The custom matcher `toContainRole` is used to assert that the form contains exactly two button elements.

### Understanding Matchers

Matchers are functions provided by Jest and extended by `@testing-library/jest-dom` to make assertions more readable and powerful. Here are some commonly used matchers:

- **Jest Matchers:**
  - `toBe(value)`: Checks if a value is strictly equal to the expected value.
  - `toEqual(value)`: Checks if an object or array is deeply equal to the expected value.
  - `toBeTruthy()`: Checks if a value is truthy.
  - `toBeFalsy()`: Checks if a value is falsy.

- **@testing-library/jest-dom Matchers:**
  - `toBeInTheDocument()`: Checks if an element is present in the document.
  - `toHaveTextContent(text)`: Checks if an element contains specific text.
  - `toBeVisible()`: Checks if an element is visible in the document.
  - `toHaveAttribute(name, value)`: Checks if an element has a specific attribute with a specific value.

### Summary

- **Matchers** are used to make assertions about the rendered components.
- **Jest** provides basic matchers, and **@testing-library/jest-dom** adds more specific matchers for DOM elements.
- **Custom matchers** like `toContainRole` can be created to extend functionality and make tests more expressive.
- The example demonstrates how to use matchers to verify the presence and count of elements in a component.