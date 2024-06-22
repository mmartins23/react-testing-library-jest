### 1. Component `App`

The `App` component is the main component that renders the application. It manages the `users` state and provides a function (`onUserAdd`) to add new users to the list.

```jsx
import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
    <div className="App">
      <UserForm onUserAdd={onUserAdd} />
      <hr/>
      <UserList users={users}/>
    </div>
  );
}

export default App;
```

- **useState:** Import `useState` from React to manage the `users` state. Initially, `users` is an empty array (`[]`).

- **onUserAdd:** This function receives a user object as a parameter and updates the `users` state by adding the new user to the array.

- **Rendering:**
  - `<UserForm onUserAdd={onUserAdd} />`: Renders the `UserForm` component and passes the `onUserAdd` function as a prop.
  - `<hr/>`: Adds a horizontal line for visual separation.
  - `<UserList users={users}/>`: Renders the `UserList` component and passes the `users` state as a prop.

### 2. Component `UserForm`

The `UserForm` component renders a form to add new users.

```jsx
import { useState } from 'react';

const UserForm = ({ onUserAdd }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserAdd({ name, email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <button type="submit">Add user</button>
    </form>
  )
}

export default UserForm;
```

- **useState:** Uses `useState` to define two local states in the `UserForm` component:
  - `email`: State to store the value of the email input field.
  - `name`: State to store the value of the name input field.

- **handleSubmit:** Called when the form is submitted. It prevents the default form behavior (`e.preventDefault()`) and invokes the `onUserAdd` function (passed as a prop) with an object containing the `name` and `email` of the user.

- **Rendering:**
  - Renders a form with input fields for name and email, and a button to add the user.

### 3. Component `UserList`

The `UserList` component renders the list of users in a table format.

```jsx
function UserList({ users }) {
  const renderedUsers = users.map((user) => {
    return (
      <tr key={user.name}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{renderedUsers}</tbody>
    </table>
  );
}

export default UserList;
```

- **users:** Received as a prop in the `UserList` component. It represents the array of users passed down from the `App` component.

- **renderedUsers:** Uses the `map` method to iterate over the `users` array and generate a list of `<tr>` (table row) elements. Each row displays the `name` and `email` of a user, with `user.name` used as the `key` attribute for React.

- **Rendering:**
  - Renders a `<table>` element with:
    - `<thead>`: Table header row (`<tr>`) containing `<th>` (table header) cells for "Name" and "Email".
    - `<tbody>`: Table body where `renderedUsers` (the mapped rows) are dynamically rendered.

### Conclusion

These components work together to create a simple user form and user list application using React. The `App` component manages the state, `UserForm` handles user input, and `UserList` displays the added users in a table format. Communication between components is facilitated through props, allowing the user list to update dynamically as new users are added via the form.