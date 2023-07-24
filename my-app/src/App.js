import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlSubmit = async () => {
    const response = await fetch('http://localhost:2000/data', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.text();
    console.log(data);
    getUsers();
  };

  const getUsers = async () => {
    const response = await fetch('http://localhost:2000/data', {
      method: 'GET',
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:2000/data/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`User with ID ${id} deleted successfully.`);
        getUsers();
      } else {
        console.log('Error deleting user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      console.log("Update");
      const selectedUser = users.find(user => user._id === id);
      if (selectedUser) {
        setForm(selectedUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handlSubmit}>
        <p>{JSON.stringify(form)}</p>
        <span>Username</span>
        <input type="text" name="username" value={form.username || ''} onChange={handleForm}></input>
        <span>Message</span>
        <input type="text" name="message" value={form.message || ''} onChange={handleForm}></input>
        <input type="submit"></input>
      </form>
      <div>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.username} <p>{user.message}</p>
              <button className='delete' onClick={() => handleDelete(user._id)}>Delete</button>
              <button className='update' onClick={() => handleUpdate(user._id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
