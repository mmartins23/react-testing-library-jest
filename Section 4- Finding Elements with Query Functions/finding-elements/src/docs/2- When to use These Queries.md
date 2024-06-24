Understanding when to use each query function in React Testing Library is essential for writing effective and reliable tests. Here's a detailed guide on when to use each type of query function:

### `getBy` Queries

**Usage:**
- Use `getBy` queries when you need to assert that a single element is present in the DOM.

**Functions:**
- `getByRole`
- `getByText`
- `getByLabelText`
- `getByPlaceholderText`
- `getByAltText`
- `getByTitle`
- `getByDisplayValue`
- `getByTestId`

**Behavior:**
- Throws an error if no element is found.
- Throws an error if more than one element is found.

**Example:**
```javascript
test('it renders the color list', () => {
  render(<ColorList />);
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();
});
```

### `getAllBy` Queries

**Usage:**
- Use `getAllBy` queries when you need to assert that multiple elements are present in the DOM.

**Functions:**
- `getAllByRole`
- `getAllByText`
- `getAllByLabelText`
- `getAllByPlaceholderText`
- `getAllByAltText`
- `getAllByTitle`
- `getAllByDisplayValue`
- `getAllByTestId`

**Behavior:**
- Throws an error if no elements are found.
- Always returns an array of elements.

**Example:**
```javascript
test('it renders all color list items', () => {
  render(<ColorList />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
});
```

### `queryBy` Queries

**Usage:**
- Use `queryBy` queries when you need to assert that a single element is **not** present in the DOM.

**Functions:**
- `queryByRole`
- `queryByText`
- `queryByLabelText`
- `queryByPlaceholderText`
- `queryByAltText`
- `queryByTitle`
- `queryByDisplayValue`
- `queryByTestId`

**Behavior:**
- Returns `null` if no element is found.
- Throws an error if more than one element is found.

**Example:**
```javascript
test('it does not render a textbox', () => {
  render(<ColorList />);
  const textbox = screen.queryByRole('textbox');
  expect(textbox).not.toBeInTheDocument();
});
```

### `queryAllBy` Queries

**Usage:**
- Use `queryAllBy` queries when you need to assert that multiple elements are **not** present in the DOM.

**Functions:**
- `queryAllByRole`
- `queryAllByText`
- `queryAllByLabelText`
- `queryAllByPlaceholderText`
- `queryAllByAltText`
- `queryAllByTitle`
- `queryAllByDisplayValue`
- `queryAllByTestId`

**Behavior:**
- Returns an empty array if no elements are found.
- Always returns an array of elements.

**Example:**
```javascript
test('it does not render any inputs', () => {
  render(<ColorList />);
  const inputs = screen.queryAllByRole('textbox');
  expect(inputs).toHaveLength(0);
});
```

### `findBy` Queries

**Usage:**
- Use `findBy` queries when you need to wait for a single element to appear in the DOM. Typically used when elements are loaded asynchronously.

**Functions:**
- `findByRole`
- `findByText`
- `findByLabelText`
- `findByPlaceholderText`
- `findByAltText`
- `findByTitle`
- `findByDisplayValue`
- `findByTestId`

**Behavior:**
- Returns a promise that resolves when the element is found.
- Throws an error if no element is found within the default timeout (1 second).

**Example:**
```javascript
test('it fetches and displays the color list', async () => {
  render(<LoadableColorList />);
  const list = await screen.findByRole('list');
  expect(list).toBeInTheDocument();
});
```

### `findAllBy` Queries

**Usage:**
- Use `findAllBy` queries when you need to wait for multiple elements to appear in the DOM. Typically used when elements are loaded asynchronously.

**Functions:**
- `findAllByRole`
- `findAllByText`
- `findAllByLabelText`
- `findAllByPlaceholderText`
- `findAllByAltText`
- `findAllByTitle`
- `findAllByDisplayValue`
- `findAllByTestId`

**Behavior:**
- Returns a promise that resolves when the elements are found.
- Throws an error if no elements are found within the default timeout (1 second).

**Example:**
```javascript
test('it fetches and displays all color list items', async () => {
  render(<LoadableColorList />);
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(3);
});
```

### Summary

- **`getBy` and `getAllBy`**: Use for asserting the existence of elements synchronously.
- **`queryBy` and `queryAllBy`**: Use for asserting the non-existence of elements.
- **`findBy` and `findAllBy`**: Use for asserting the existence of elements asynchronously, typically when dealing with asynchronous data fetching or delayed rendering.

By understanding these functions and their appropriate use cases, you can write more precise and reliable tests for your React components.