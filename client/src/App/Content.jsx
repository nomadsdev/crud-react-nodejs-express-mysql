import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Content() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users', { name, email });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (id, newData) => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, newData);
      // โค้ดที่ทำงานเมื่อการอัพเดทสำเร็จ
    } catch (error) {
      console.error('Error updating user:', error.message);
      if (axios.isCancel(error)) {
        // กรณีการร้องขอถูกยกเลิก
        console.log('Request canceled:', error.message);
      } else {
        // กรณี error อื่น ๆ
        console.error('Other error:', error);
      }
    }
  };  
  

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };    

  return (
    <div>
        <form action="">
        <h1 className='text-center p-10 text-2xl text-indigo-600'>CRUD App with React, Node.js, Express, and MySQL</h1>
      <div className='flex justify-center items-center pb-4'>
        <label className='text-indigo-600 pr-4'>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border rounded-xl'/>
      </div>
      <div className='flex justify-center items-center pb-4'>
        <label className='text-indigo-600 pr-4'>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  className='border rounded-xl'/>
      </div>
      <div className='flex justify-center items-center p-10'>
      <button onClick={addUser} className='text-indigo-600 border border-indigo-600 px-5 py-2 rounded-xl'>Add User</button>
      </div>
      <div className='flex justify-center items-center'>
        <ul className='border px-10 py-5 rounded-xl'>
            {users.map((user) => (
            <li key={user.id}>
                <p className='px-4'>Name : {user.name}</p>
                <br />
                <p className='px-4'>Email : {user.email}{' '}</p>
                <br />
                <button className='text-blue-600 border border-blue-600 px-5 py-1 rounded-xl mx-2' onClick={() => updateUser(user.id)}>Update</button>
                <button className='text-red-600 border border-red-600 px-5 py-1 rounded-xl mx-2' onClick={() => deleteUser(id)}>Delete</button>
            </li>
            ))}
        </ul>
      </div>
      </form>
    </div>
  )
}

export default Content