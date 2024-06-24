import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


function AccessibleName() {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
}

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
  