### Directly Assigning an Accessible Name

When working with elements that don't contain text content, such as elements displaying icons, you can directly assign an accessible name using the `aria-label` attribute. This makes the elements identifiable by their role and the assigned accessible name.

#### Example: IconButtons Component

In the `IconButtons` component below, each button contains an SVG icon and is given an accessible name using the `aria-label` attribute. This allows assistive technologies to identify and interact with these buttons.

```javascript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function IconButtons() {
  return (
    <div>
      <button aria-label="sign in">
        <svg />
      </button>
      <button aria-label="sign out">
        <svg />
      </button>
    </div>
  );
}
render(<IconButtons />);
```

#### Test: Finding Elements Based on Label

The test below demonstrates how to find these button elements based on their role and the accessible name provided by the `aria-label` attribute.

```javascript
test('find elements based on label', () => {
  render(<IconButtons />);

  const signInButton = screen.getByRole('button', { name: /sign in/i });
  const signOutButton = screen.getByRole('button', { name: /sign out/i });

  expect(signInButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
});
```

### Explanation

1. **Component Definition**: The `IconButtons` component defines two buttons, each with an `aria-label` attribute. The `aria-label` attribute provides an accessible name for these buttons, which is especially useful since the buttons contain SVG elements rather than text.
   - `<button aria-label="sign in"><svg /></button>`
   - `<button aria-label="sign out"><svg /></button>`

2. **Rendering the Component**: The `IconButtons` component is rendered using `render(<IconButtons />);`.

3. **Test Definition**: The test case checks for the presence of the buttons by their roles and accessible names.
   - `screen.getByRole('button', { name: /sign in/i })` retrieves the button with the role `button` and the accessible name matching `/sign in/i`.
   - `screen.getByRole('button', { name: /sign out/i })` retrieves the button with the role `button` and the accessible name matching `/sign out/i`.

4. **Assertions**: The test case uses `expect(...).toBeInTheDocument()` to verify that both buttons are present in the document.

By using `aria-label`, we ensure that the buttons are accessible and easily identifiable by their intended purpose, even though they do not contain traditional text content. This method is particularly useful for elements that display icons or other non-textual content.