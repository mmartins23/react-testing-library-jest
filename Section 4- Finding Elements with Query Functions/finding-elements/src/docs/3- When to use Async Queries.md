### When to Use Async Queries in React Testing Library

Async queries in React Testing Library (`findBy` and `findAllBy`) are particularly useful for dealing with elements that appear asynchronously, such as those fetched from an API or updated after some asynchronous action. Here's a detailed guide on when and how to use these async queries:

### Use Cases for Async Queries

1. **Elements Loaded After a Delay:**
   - When elements appear in the DOM after a set timeout or delay.

2. **Elements Loaded via API Calls:**
   - When elements are fetched from a server or external API and displayed once the data is retrieved.

3. **Elements Displayed After User Interactions:**
   - When elements appear as a result of user interactions that trigger asynchronous updates (e.g., button clicks leading to form submissions).

4. **Elements Loaded During Route Changes:**
   - When elements are loaded upon navigation to a different route in single-page applications (SPA).

### Examples of Using Async Queries

#### Example 1: Fetching Data from an API

In this example, a component fetches a list of colors from an API and displays them in a list.

**Component Code:**
```javascript
import { useState, useEffect } from 'react';

function fakeFetchColors() {
  return Promise.resolve(['red', 'green', 'blue']);
}

function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors().then(c => setColors(c));
  }, []);

  const renderedColors = colors.map(color => {
    return <li key={color}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
}

export default LoadableColorList;
```

**Test Code:**
```javascript
import { render, screen } from '@testing-library/react';
import LoadableColorList from './LoadableColorList';

test('it fetches and displays all color list items', async () => {
  render(<LoadableColorList />);
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(3);
});
```

#### Example 2: Element Appearing After a Delay

In this example, a component displays a message after a delay.

**Component Code:**
```javascript
import { useState, useEffect } from 'react';

function DelayedMessage() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showMessage && <p role="alert">Hello, World!</p>}
    </div>
  );
}

export default DelayedMessage;
```

**Test Code:**
```javascript
import { render, screen } from '@testing-library/react';
import DelayedMessage from './DelayedMessage';

test('it displays a message after a delay', async () => {
  render(<DelayedMessage />);
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent('Hello, World!');
});
```

### Summary

- **Use `findBy` and `findAllBy`** when:
  - **Asynchronous Data**: Elements are fetched and rendered asynchronously from a server or an API.
  - **Delayed Rendering**: Elements appear after a set delay or as a result of a timeout.
  - **User Interactions**: Elements appear in response to user interactions that cause asynchronous updates.

- **Key Points**:
  - `findBy`: Used to find a single element asynchronously. It returns a promise that resolves when the element is found.
  - `findAllBy`: Used to find multiple elements asynchronously. It returns a promise that resolves when all matching elements are found.
  - Both `findBy` and `findAllBy` throw an error if the element(s) are not found within the default timeout (1 second).

By using async queries appropriately, you ensure that your tests correctly handle elements that appear asynchronously, leading to more reliable and accurate test outcomes.