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
    <div className='container'>
      <h1>MyApp</h1>
      <form onSubmit={handlSubmit}>
      <input type="hidden" name="_id" value={form._id || ''} />
<div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">Heading</label>
<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter the Heading" name="username" value={form.username || ''} onChange={handleForm} />
</div>
      <label for="exampleFormControlTextarea1" class="form-label">Message</label>
<textarea class="form-control" id="exampleFormControlTextarea1"  placeholder="Enter the Message" name="message" rows="3" value={form.message || ''} onChange={handleForm}></textarea>
      <input type="submit" class="btn btn-success" />
    </form>
      <div>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <span>{user.username}</span> <p>{user.message}</p>
              <button className="btn btn-outline-danger" onClick={() => handleDelete(user._id)}>Delete</button>
              <button className='btn btn-outline-warning' onClick={() => handleUpdate(user._id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
