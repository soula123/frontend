import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import { Container, Table,Button, Row } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen , faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';    
import AddEnv from '../../components/AddEnv/Modal/AddEnv';
function Environement(){
      const [database,setDatabase] = useState([]);
      useEffect(() => {
        // fetch schema options from Django database
        axios.get("http://127.0.0.1:8000/api/displayAll")
          .then((response) => {
            const data = JSON.parse(response['data']);

            setDatabase(data);
            console.log(data)
        })
          .catch((error) => console.log(error));
        
        }, []);
      const [checkedItems, setCheckedItems] = useState([]);
      function handleCheckboxChange(event) {
        const target = event.target;
        const value = target.value;
        const checked = target.checked;
    
        if (checked) {
          setCheckedItems([...checkedItems, value]);
        } else {
          setCheckedItems(checkedItems.filter(item => item !== value));
        }
      }
      function handleSelectAll(event) {
        if (event.target.checked) {
          const checkboxes = document.querySelectorAll('input[type="checkbox"]');
          const values = Array.from(checkboxes).map(checkbox => checkbox.value);
          setCheckedItems(values);
        } else {
          setCheckedItems([]);
        }
      }

    return(
        <div className='class="d-flex justify-content-center' style={{width:"100%",padding:"10px",marginLeft:"15px"}}> 
                    <div className="table-title ">
                      <Row>
                        <div className="col-xs-6">
                          <h2>Manage <b>Environments</b></h2>
                        </div>
                        <div className="col-xs-6">
                          
                          <AddEnv/> 
                          <a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><span>Delete <FontAwesomeIcon icon={faTrash} size='lg'/></span></a>						
                        </div>
                        </Row>
                    </div>
                <Table className='table-striped table-hover mx-auto '>
                    <thead>
                        <tr>
                          <th>
                            <span className="custom-checkbox">
                              <input type="checkbox" id="selectAll" onChange={handleSelectAll}/>
                              <label htmlFor="selectAll" />
                            </span> 
                            
                          </th>
                          <th>Name</th>
                          <th>User</th>
                          <th>Password</th>
                          <th>Host</th>
                          <th>Service</th>
                          <th>Schema</th>
                          <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {database.map((item, index) => (
                        
                        <tr>
                        <td>
                          <span className="custom-checkbox">
                            <input type="checkbox" id="checkbox1" onChange={handleCheckboxChange}  name="options[]" defaultValue={1} />
                            <label htmlFor="checkbox1" />
                          </span>
                        </td>
                        <td>{item.fields.name}</td>
                        <td>{item.fields.password}</td>
                        <td>{item.fields.password}</td>
                        <td>{item.fields.host}</td>
                        <td>{item.fields.service}</td>
                        <td>{item.fields.schema}</td>
                        <td>
                        <Button variant="outline-success" size='sm'><FontAwesomeIcon icon={faPen} size='lg'/></Button>
                        <Button variant="outline-danger" size='sm'><FontAwesomeIcon icon={faTrash} size='lg'/></Button>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                    
                </Table>
            
           </div>
    )
}

export default Environement;