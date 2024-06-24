import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';


function FormData() {
  return (
    <form aria-label="form">
      <button>Save</button>
      <button>Cancel</button>
    </form>
  );
}

test('the form displays two buttons', () => {
    render(<FormData />);
  
    const buttons = screen.getAllByRole('button');
  
    expect(buttons).toHaveLength(2); // Assertion to check that there are exactly two buttons
  });
  