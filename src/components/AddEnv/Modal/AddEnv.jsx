import React from 'react';
import Modal from 'react-modal';
//import "./AddEmp.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen , faPlus } from '@fortawesome/free-solid-svg-icons'
import  { useState, useEffect } from "react";
import axios from 'axios';

import "./addDb.css"


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function AddEnv() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [connectionEstablished, setConnectionEstablished] = useState(false); // new state variable

  const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
	window.location.reload(false);
    setIsOpen(false);
  }
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    password: "",
    host: "",
    schema: "",
    serviceName: "",
  });
  const Testconnection = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/testconnnection",formData)
      .then(response => {
        alert(response.data['message'])
        setConnectionEstablished(true) // update state variable if connection is established
      })
      .catch(error => {
        alert(error.response.data['message'])
        setConnectionEstablished(false) // update state variable if connection fails
      })
  }

  const [schemaOptions, setSchemaOptions] = useState([]);

  useEffect(() => {
    // fetch schema options from Django database
    axios.get("http://127.0.0.1:8000/api/ShowSchemeNames")
      .then((response) => {
        setSchemaOptions(response['data']['schema_names']);
        console.log(response['data']['schema_names'])
    })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (connectionEstablished) { // check if connection is established
      axios.post("http://127.0.0.1:8000/api/AddDatabase",formData)
        .then(response => alert(response))
        .catch(error => alert(error.response.data['message']))
      console.log(formData);
    } else {
      alert('Connection not established') // show error message if connection is not established
    }
  };
    
  return (
    <div>
      <a onClick={openModal} className="btn btn-success" data-toggle="modal"><span>Add <FontAwesomeIcon icon={faPlus} size='lg'/></span></a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
		style={customStyles}
      >
    
  
      
		<div className="modal-dialog">
			
      
    <form className='AllFields'  onSubmit={handleSubmit}>
      <div className='inputfield'>
        <label >Name:</label>
        <input
          
          id="name"
          name="name"
          value={formData.name}
          className="field"
          onChange={handleChange}
          required
        />
      </div>
      <div className='inputfield'>
        <label htmlFor="user">User:</label>
        <input
        className="field"
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />
      </div>
      <div className='inputfield'>
        <label htmlFor="password">Password:</label>
        <input
        className="field"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='inputfield'>
        <label htmlFor="host">Host:</label>
        <input
        className="field"
          type="text"
          id="host"
          name="host"
          value={formData.host}
          onChange={handleChange}
          required
        />
      </div>
      <div className='inputfield'>
        <label htmlFor="schema">Schema:</label>
        <select
          id="schema"
          name="schema"
          value={formData.schema}
          onChange={handleChange}
        >
          <option value="">Select a schema</option>
          {schemaOptions.map((schema,key) => (
            <option key={key} value={schema}>
              {schema}
            </option>
          ))}
        </select>
      </div>
      <div className='inputfield'>
        <label htmlFor="serviceName">Service Name:</label>
        <input
        className="field"
          type="text"
          id="serviceName"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          required
        />
      </div>
      <button className="testbtn" onClick={Testconnection}>Test connection</button>
      <button className="btin" type="submit">Submit</button>
    
    </form>
    
    			
	
        </div>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default AddEnv;