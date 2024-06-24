import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function ColorList() {
  return (
    <ul> 
      <li>Red</li> 
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}

test('getBy, queryBy, findBy when they find 1 element', async () => {
    render(<ColorList />);
  
    expect(
      screen.getByRole('list')
    ).toBeInTheDocument();  // Finds the <ul> element
  
    expect(
      screen.getByRole('list')
    ).toBeInTheDocument();  // Finds the <ul> element
  
    expect(
      await screen.findByRole('list')
    ).toBeInTheDocument();  // Finds the <ul> element after waiting
  });
  
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
  