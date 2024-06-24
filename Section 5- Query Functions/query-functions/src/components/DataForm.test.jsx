import { screen, render } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';


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
  
