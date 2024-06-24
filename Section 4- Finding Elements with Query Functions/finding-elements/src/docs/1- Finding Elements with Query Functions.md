### Query Functions Overview

The content begins by explaining query functions in React Testing Library. These functions are used to query elements in a rendered React component.

#### Categories of Query Functions

1. **`getBy` Functions**:
   - Examples: `getByRole`, `getByText`
   - Returns: A single element
   - Throws an error if 0 or more than 1 element is found

2. **`getAllBy` Functions**:
   - Examples: `getAllByText`, `getAllByRole`
   - Returns: An array of elements
   - Throws an error if 0 elements are found

3. **`queryBy` Functions**:
   - Examples: `queryByRole`, `queryByText`
   - Returns: A single element or `null`
   - Returns `null` if 0 elements are found
   - Throws an error if more than 1 element is found

4. **`queryAllBy` Functions**:
   - Examples: `queryAllByText`, `queryAllByRole`
   - Returns: An array of elements or an empty array if no elements are found

5. **`findBy` Functions**:
   - Examples: `findByRole`, `findByText`
   - Returns: A single element
   - Works asynchronously, waiting up to 1 second to find an element
   - Throws an error if 0 or more than 1 element is found

6. **`findAllBy` Functions**:
   - Examples: `findAllByText`, `findAllByRole`
   - Returns: An array of elements
   - Works asynchronously, waiting up to 1 second to find elements
   - Throws an error if 0 elements are found

### Explanation of When to Use Each Function

- **Use `getBy` or `getAllBy`** when you want to prove that an element exists in the document.
- **Use `queryBy` or `queryAllBy`** when you want to prove that an element does not exist in the document.
- **Use `findBy` or `findAllBy`** when you expect an element to eventually appear (useful for async operations).

### Example Components and Tests

#### Component: `ColorList`

```javascript
import { render, screen } from '@testing-library/react';

function ColorList() {
  return (
    <ul> 
      <li>Red</li> 
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}

render(<ColorList />);
```

This is a simple React component that renders an unordered list with three list items.

#### Test: `getBy, queryBy, findBy finding 0 elements`

```javascript
test('getBy, queryBy, findBy finding 0 elements', async () => {
  render(<ColorList />);

  expect(
    () => screen.getByRole('textbox')
  ).toThrow();  // Throws an error because there is no textbox

  expect(screen.queryByRole('textbox')).toEqual(null);  // Returns null because there is no textbox

  let errorThrown = false;
  try {
    await screen.findByRole('textbox');  // Throws an error because there is no textbox after waiting
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});
```

This test verifies that the `getBy`, `queryBy`, and `findBy` functions handle the scenario where no matching elements are found.

#### Test: `getBy, queryBy, findBy when they find 1 element`

```javascript
test('getBy, queryBy, findBy when they find 1 element', async () => {
  render(<ColorList />);

  expect(
    screen.getByRole('list')
  ).toBeInTheDocument();  // Finds the <ul> element

  expect(
    screen.queryByRole('list')
  ).toBeInTheDocument();  // Finds the <ul> element

  expect(
    await screen.findByRole('list')
  ).toBeInTheDocument();  // Finds the <ul> element after waiting
});
```

This test verifies that the `getBy`, `queryBy`, and `findBy` functions correctly find a single matching element.

#### Test: `getBy, queryBy, findBy when finding > 1 elements`

```javascript
test('getBy, queryBy, findBy when finding > 1 elements', async () => {
  render(<ColorList />);

  expect(
    () => screen.getByRole('listitem')
  ).toThrow();  // Throws an error because there are multiple <li> elements

  expect(
    () => screen.queryByRole('listitem')
  ).toThrow();  // Throws an error because there are multiple <li> elements

  let errorThrown = false;
  try {
    await screen.findByRole('listitem');  // Throws an error because there are multiple <li> elements after waiting
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});
```

This test checks how the `getBy`, `queryBy`, and `findBy` functions behave when there are multiple matching elements.

#### Test: `getAllBy, queryAllBy, findAllBy`

```javascript
test('getAllBy, queryAllBy, findAllBy', async () => {
  render(<ColorList />);

  expect(
    screen.getAllByRole('listitem')
  ).toHaveLength(3);  // Finds all <li> elements

  expect(
    screen.queryAllByRole('listitem')
  ).toHaveLength(3);  // Finds all <li> elements

  expect(
    await screen.findAllByRole('listitem')
  ).toHaveLength(3);  // Finds all <li> elements after waiting
});
```

This test verifies that the `getAllBy`, `queryAllBy`, and `findAllBy` functions correctly find multiple matching elements.

#### Test: `favor using getBy to prove an element exists`

```javascript
test('favor using getBy to prove an element exists', () => {
  render(<ColorList />);

  const element = screen.getByRole('list');
  expect(element).toBeInTheDocument();
});
```

This test shows the preferred usage of `getBy` to prove that an element exists in the document.

#### Test: `favor queryBy when proving an element does not exist`

```javascript
test('favor queryBy when proving an element does not exist', () => {
  render(<ColorList />);

  const element = screen.queryByRole('textbox');
  expect(element).not.toBeInTheDocument();
});
```

This test demonstrates using `queryBy` to prove that an element does not exist in the document.

#### Component: `LoadableColorList`

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

  const renderedColors = colors.map(color => (
    <li key={color}>{color}</li>
  ));

  return <ul>{renderedColors}</ul>;
}

render(<LoadableColorList />);
```

This component simulates fetching colors from an API and rendering them as a list.

#### Test: `Favor findBy or findAllBy when data fetching`

```javascript
test('Favor findBy or findAllBy when data fetching', async () => {
  render(<LoadableColorList />);

  const els = await screen.findAllByRole('listitem');
  expect(els).toHaveLength(3);  // Expects 3 <li> elements after data fetching
});
```

This test demonstrates using `findBy` or `findAllBy` for elements that appear asynchronously (e.g., after fetching data).

---

This explanation covers the main concepts and usage of the different query functions in React Testing Library, with specific examples and scenarios demonstrating their appropriate usage in testing React components.