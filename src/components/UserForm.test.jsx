import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this import is here
import UserForm from './UserForm';

test("it shows two inputs and a button", () => {
    // Render the component
    render(<UserForm />);

    // Manipulate the component or find an element
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // Make sure the component is doing what it's expected
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});
