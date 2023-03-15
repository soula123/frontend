import { useState } from "react";
/*import ReactDOM from "react-dom/client";*/
import axios from 'axios';
function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/AddScheme',inputs)
    .then(response => alert(response.data['message']));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>user:
      <input 
        type="text" 
        name="user" 
        value={inputs.user || ""} 
        onChange={handleChange}
      />
      </label>
      <br/>
      <label>password:
        <input 
          type="password" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <br/>
        <label>Host
            <input 
            type="text"
            name="host"
            value={inputs.host || ""}
            onChange={handleChange} 
            />
        </label>
        <br/>
        <label>Service Name
            <input
            type="text"
            name="service"
            value={inputs.service || ""}
            onChange={handleChange}
            />
        </label>
        <br/>
        <label>Schema Name
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
    </form>
  )
}

export default MyForm;


              