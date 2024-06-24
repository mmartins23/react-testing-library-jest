### When to Use Each Query Function

Selecting the appropriate query function depends on the type of element you are trying to find and the attributes available. Here’s a detailed guide on when to use each query function:

1. **`ByRole`**
   - **Use When:** The element has an implicit or explicit ARIA role.
   - **Examples:** Buttons, headings, links, form elements, etc.
   - **Why:** This query reflects how users with assistive technologies interact with elements.
   - **Example Usage:** 
     ```javascript
     screen.getByRole('button');
     ```

2. **`ByLabelText`**
   - **Use When:** The element is a form control that is associated with a label.
   - **Examples:** Input, textarea, select elements.
   - **Why:** Ensures that the label text is correctly associated with the form control.
   - **Example Usage:** 
     ```javascript
     screen.getByLabelText('Email');
     ```

3. **`ByPlaceholderText`**
   - **Use When:** The element has a placeholder attribute.
   - **Examples:** Input elements with placeholder text.
   - **Why:** Useful for identifying form elements in the absence of labels.
   - **Example Usage:** 
     ```javascript
     screen.getByPlaceholderText('Enter your email');
     ```

4. **`ByText`**
   - **Use When:** The element contains specific text content.
   - **Examples:** Paragraphs, divs, spans, and other elements with text content.
   - **Why:** Useful for finding elements based on their visible text.
   - **Example Usage:** 
     ```javascript
     screen.getByText('Submit');
     ```

5. **`ByDisplayValue`**
   - **Use When:** The element has a current value.
   - **Examples:** Input, textarea, and select elements.
   - **Why:** Useful for verifying the current value of a form control.
   - **Example Usage:** 
     ```javascript
     screen.getByDisplayValue('user@example.com');
     ```

6. **`ByAltText`**
   - **Use When:** The element has an `alt` attribute.
   - **Examples:** Images.
   - **Why:** Ensures images have appropriate alternative text for accessibility.
   - **Example Usage:** 
     ```javascript
     screen.getByAltText('Profile picture');
     ```

7. **`ByTitle`**
   - **Use When:** The element has a `title` attribute.
   - **Examples:** Any element with a title attribute, commonly used in tooltips.
   - **Why:** Useful for finding elements with additional descriptive text.
   - **Example Usage:** 
     ```javascript
     screen.getByTitle('Close');
     ```

8. **`ByTestId`**
   - **Use When:** The element has a `data-testid` attribute.
   - **Examples:** Any element.
   - **Why:** Use this as a last resort when other methods are not practical or possible.
   - **Example Usage:** 
     ```javascript
     screen.getByTestId('custom-element');
     ```

### Examples in Context

Let's apply these functions to a sample component:

#### Component: `DataForm`

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

#### Test: Selecting Different Elements

```javascript
test('selecting different elements', () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole('button'),  // Finds the button element
    screen.getByText(/enter/i),  // Finds the <h3> element with text "Enter Data"
    screen.getByLabelText(/email/i),  // Finds the input element labeled "Email"
    screen.getByPlaceholderText('Red'),  // Finds the input element with placeholder "Red"
    screen.getByDisplayValue('asdf@asdf.com'),  // Finds the input element with the current value
    screen.getByAltText('data'),  // Finds the image element with alt text "data"
    screen.getByTitle(/ready to submit/i),  // Finds the button element with title attribute
    screen.getByTestId('image-wrapper')  // Finds the div element with data-testid attribute
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();  // Asserts that each element is in the document
  }
});
```

### Summary

- **Use `ByRole`** for most cases, as it best simulates user interactions.
- **Use `ByLabelText`, `ByPlaceholderText`, `ByText`, `ByDisplayValue`, `ByAltText`, `ByTitle`** when `ByRole` is not applicable.
- **Use `ByTestId`** as a last resort, primarily for custom elements or when other selectors are not suitable.

By following these guidelines, you can write clear and maintainable tests that accurately reflect user interactions with your components.