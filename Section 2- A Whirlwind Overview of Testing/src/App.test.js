import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from './App';

test('can receive a new user and show it on a list', async () => {
    // Render the App component
    render(<App />);

    // Find the input elements and the button
    const nameInput = screen.getByRole('textbox', {
        name: /name/i,
    });
    const emailInput = screen.getByRole('textbox', {
        name: /email/i,
    });
    const button = screen.getByRole('button');

    // Simulate user interactions: typing a name and email, then clicking the button
    await user.click(nameInput);
    await user.keyboard('jane');
    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    await user.click(button);

    // Assertions: Check if the new user appears in the list
    const nameCell = screen.getByRole('cell', { name: 'jane' });
    const emailCell = screen.getByRole('cell', { name: 'jane@jane.com' });

    expect(nameCell).toBeInTheDocument();
    expect(emailCell).toBeInTheDocument();
});