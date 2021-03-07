import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const CreateNote = (props) => {

  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    userSelected: '',
    title: '',
    content: ''
  });

  const [date, setDate] = useState(new Date());

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');

  const getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    setUsers(res.data.map(user => user.username));
  }

  const checkEditing = async () => {
    if (props.match.params.id) {
      const res = await axios.get('http://localhost:4000/api/notes/' + props.match.params.id);
      /* console.log(res.data); */
      const { title, content, date, author } = res.data;
      setState(
        {
          title,
          content,
          userSelected: author
        }
      );
      setDate(new Date(date));
      setEditing(true);
      setId(props.match.params.id);

    }
  }

  useEffect(() => {
    getUsers();
    checkEditing();
  }, []);

  useEffect(() => {
    setState(s =>
      ({ ...s, userSelected: users[0] })
    );
  }, [users]);

  const onSubmit = async e => {
    e.preventDefault();
    const { userSelected, title, content } = state;

    const newNote = {
      author: userSelected,
      title,
      content,
      date: date
    };

    if (editing) {
      await axios.put('http://localhost:4000/api/notes/' + id, newNote);
    } else {
      await axios.post('http://localhost:4000/api/notes', newNote);
    }



    window.location.href = '/';
  }

  const onInputChange = e => {
    setState(
      { ...state, [e.target.name]: e.target.value }
    );
  }

  /* const onChangeDate = date => {
    setDate(date);
  } */
  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create Note</h4>
        {/* SELECT USER */}
        <div className="mb-3">
          <select
            className="form-control"
            name="userSelected"
            onChange={onInputChange}
            value={state.userSelected}
          >
            {
              users.map(user =>
                <option key={user} value={user}>
                  {user}
                </option>)
            }
          </select>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            required
            onChange={onInputChange}
            value={state.title}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            required
            onChange={onInputChange}
            value={state.content}
          ></textarea>
        </div>
        <div className="mb-3">
          <DatePicker
            className="form-control"
            selected={date}
            onChange={date => setDate(date)}

          />
        </div>


        <form onSubmit={onSubmit}>

          <button type="submit" className="btn btn-primary">
            Save
        </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNote
