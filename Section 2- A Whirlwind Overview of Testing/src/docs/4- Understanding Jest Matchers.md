### Understanding Jest Matchers in Jest

Jest matchers are methods that allow you to test values in different ways. They form the backbone of assertions in Jest tests, helping you verify that your code is functioning as expected. Here's a comprehensive overview of how to use Jest matchers effectively:

### Basic Matchers

1. **`toBe`**
   - **Usage:** `expect(value).toBe(expected)`
   - **Description:** Tests for strict equality using `Object.is`.
   - **Example:** 
     ```javascript
     expect(2 + 2).toBe(4);
     ```

2. **`toEqual`**
   - **Usage:** `expect(value).toEqual(expected)`
   - **Description:** Tests for deep equality. Useful for comparing objects and arrays.
   - **Example:** 
     ```javascript
     const obj = { a: 1, b: 2 };
     expect(obj).toEqual({ a: 1, b: 2 });
     ```

### Truthiness Matchers

1. **`toBeNull`**
   - **Usage:** `expect(value).toBeNull()`
   - **Description:** Tests if a value is `null`.
   - **Example:** 
     ```javascript
     expect(null).toBeNull();
     ```

2. **`toBeDefined`**
   - **Usage:** `expect(value).toBeDefined()`
   - **Description:** Tests if a value is not `undefined`.
   - **Example:** 
     ```javascript
     let x = 1;
     expect(x).toBeDefined();
     ```

3. **`toBeUndefined`**
   - **Usage:** `expect(value).toBeUndefined()`
   - **Description:** Tests if a value is `undefined`.
   - **Example:** 
     ```javascript
     let y;
     expect(y).toBeUndefined();
     ```

4. **`toBeTruthy`**
   - **Usage:** `expect(value).toBeTruthy()`
   - **Description:** Tests if a value is truthy.
   - **Example:** 
     ```javascript
     expect(true).toBeTruthy();
     ```

5. **`toBeFalsy`**
   - **Usage:** `expect(value).toBeFalsy()`
   - **Description:** Tests if a value is falsy.
   - **Example:** 
     ```javascript
     expect(false).toBeFalsy();
     ```

### Numbers Matchers

1. **`toBeGreaterThan`**
   - **Usage:** `expect(value).toBeGreaterThan(expected)`
   - **Description:** Tests if a value is greater than the expected value.
   - **Example:** 
     ```javascript
     expect(10).toBeGreaterThan(5);
     ```

2. **`toBeGreaterThanOrEqual`**
   - **Usage:** `expect(value).toBeGreaterThanOrEqual(expected)`
   - **Description:** Tests if a value is greater than or equal to the expected value.
   - **Example:** 
     ```javascript
     expect(10).toBeGreaterThanOrEqual(10);
     ```

3. **`toBeLessThan`**
   - **Usage:** `expect(value).toBeLessThan(expected)`
   - **Description:** Tests if a value is less than the expected value.
   - **Example:** 
     ```javascript
     expect(5).toBeLessThan(10);
     ```

4. **`toBeLessThanOrEqual`**
   - **Usage:** `expect(value).toBeLessThanOrEqual(expected)`
   - **Description:** Tests if a value is less than or equal to the expected value.
   - **Example:** 
     ```javascript
     expect(5).toBeLessThanOrEqual(5);
     ```

5. **`toBeCloseTo`**
   - **Usage:** `expect(value).toBeCloseTo(expected, numDigits)`
   - **Description:** Tests if a value is approximately equal to the expected value, with a precision defined by `numDigits`.
   - **Example:** 
     ```javascript
     expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
     ```

### Strings Matchers

1. **`toMatch`**
   - **Usage:** `expect(value).toMatch(regexOrString)`
   - **Description:** Tests if a string matches a regular expression or string.
   - **Example:** 
     ```javascript
     expect('hello world').toMatch(/hello/);
     ```

### Arrays and Iterables Matchers

1. **`toContain`**
   - **Usage:** `expect(array).toContain(item)`
   - **Description:** Tests if an array or iterable contains a specific item.
   - **Example:** 
     ```javascript
     expect([1, 2, 3]).toContain(2);
     ```

### Exceptions Matchers

1. **`toThrow`**
   - **Usage:** `expect(function).toThrow(error)`
   - **Description:** Tests if a function throws an error when called.
   - **Example:** 
     ```javascript
     function throwError() {
       throw new Error('something went wrong');
     }
     expect(throwError).toThrow('something went wrong');
     ```

### Asynchronous Matchers

1. **`resolves`**
   - **Usage:** `expect(promise).resolves.toBe(value)`
   - **Description:** Tests if a promise resolves to a specific value.
   - **Example:** 
     ```javascript
     await expect(Promise.resolve(3)).resolves.toBe(3);
     ```

2. **`rejects`**
   - **Usage:** `expect(promise).rejects.toBe(value)`
   - **Description:** Tests if a promise rejects with a specific value.
   - **Example:** 
     ```javascript
     await expect(Promise.reject('error')).rejects.toBe('error');
     ```

### Example Usage in a Jest Test

```javascript
import { sum, fetchData } from './utils';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('fetches data from an API', async () => {
  const data = await fetchData();
  expect(data).toBeTruthy();
  expect(data).toHaveProperty('id');
});
```

In this example, we use `toBe` for strict equality, `toEqual` for object comparison, and `toBeTruthy` to check if the fetched data exists. This showcases the versatility of Jest matchers in writing clear and effective tests.