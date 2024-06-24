### Query Functions in React Testing Library

React Testing Library provides several query functions to find elements within the rendered output of your React components. These functions are used to locate elements based on different criteria, ensuring that your tests can interact with the components as a user would. 

### Query Functions and Their Criteria

Here's a breakdown of the query functions and their corresponding search criteria:

| End of Function Name | Search Criteria                                                    |
|----------------------|--------------------------------------------------------------------|
| `ByRole`             | Finds elements based on their implicit or explicit ARIA role       |
| `ByLabelText`        | Finds form elements based upon the text their paired labels contain |
| `ByPlaceholderText`  | Finds form elements based upon their placeholder text              |
| `ByText`             | Finds elements based upon the text they contain                    |
| `ByDisplayValue`     | Finds elements based upon their current value                      |
| `ByAltText`          | Finds elements based upon their `alt` attribute                    |
| `ByTitle`            | Finds elements based upon their `title` attribute                  |
| `ByTestId`           | Finds elements based upon their `data-testid` attribute            |

### Preferred Query Functions

**`ByRole`** is the most recommended query function as it closely mimics how users with assistive technologies interact with elements. If `ByRole` is not suitable, consider using other query functions.

### Examples of Query Functions

Let's look at a practical example to see how these query functions can be used.

#### Example Component: `DataForm`

```javascript
import { screen, render } from '@testing-library/react';
import { useState } from 'react';

function DataForm() {
  const [email, setEmail] = useState('asdf@asdf.com');

  return (
    <form>
      <h3>Enter Data</h3>

      <div data-testid="image-wrapper">
        <img alt="data" src="data.jpg" />
      </div>

      <label htmlFor="email">Email</label>
      <input 
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input id="color" placeholder="Red" />

      <button title="Click when ready to submit">
        Submit
      </button>
    </form>
  );
}

render(<DataForm />);
```

#### Example Test: Selecting Different Elements

```javascript
test('selecting different elements', () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole('button'),
    screen.getByText(/enter/i),
    screen.getByLabelText(/email/i),
    screen.getByPlaceholderText('Red'),
    screen.getByDisplayValue('asdf@asdf.com'),
    screen.getByAltText('data'),
    screen.getByTitle(/ready to submit/i),
    screen.getByTestId('image-wrapper')
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();
  }
});
```

### Breakdown of Query Functions in the Test

1. **`getByRole`**:
   - `screen.getByRole('button')`: Finds the button element based on its role.

2. **`getByText`**:
   - `screen.getByText(/enter/i)`: Finds the `<h3>` element containing the text "Enter Data" (case-insensitive).

3. **`getByLabelText`**:
   - `screen.getByLabelText(/email/i)`: Finds the input element associated with the "Email" label.

4. **`getByPlaceholderText`**:
   - `screen.getByPlaceholderText('Red')`: Finds the input element with the placeholder "Red".

5. **`getByDisplayValue`**:
   - `screen.getByDisplayValue('asdf@asdf.com')`: Finds the input element with the current value of 'asdf@asdf.com'.

6. **`getByAltText`**:
   - `screen.getByAltText('data')`: Finds the image element with the alt text "data".

7. **`getByTitle`**:
   - `screen.getByTitle(/ready to submit/i)`: Finds the button element with the title "Click when ready to submit" (case-insensitive).

8. **`getByTestId`**:
   - `screen.getByTestId('image-wrapper')`: Finds the div element with the `data-testid` attribute of "image-wrapper".

### When to Use Each Query Function

- **`ByRole`**: Use when you can leverage ARIA roles (buttons, headings, etc.).
- **`ByLabelText`**: Use for form elements associated with labels.
- **`ByPlaceholderText`**: Use for inputs with placeholder text.
- **`ByText`**: Use for elements with specific text content.
- **`ByDisplayValue`**: Use for form elements with a specific value.
- **`ByAltText`**: Use for images with alt text.
- **`ByTitle`**: Use for elements with a title attribute.
- **`ByTestId`**: Use as a last resort when other methods are not practical or possible.

By understanding and using these query functions appropriately, you can write more effective and readable tests that closely mimic user interactions.