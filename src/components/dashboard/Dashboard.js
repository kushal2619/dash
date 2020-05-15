import React, { Component } from 'react';

import { Link } from "react-router-dom";
import { Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';

import "./DashboardStyle.css";

class Dashboard extends Component {

  

  state = {
    dataBlocks: [],
  }

  getTableData = () => {

    fetch("http://dummy.restapiexample.com/api/v1/employees").then((res) => {
      res.json().then((data) => {
        console.log(data.data)
        
        let rowTable=[];
        data.data.forEach((val) => {

          let colTable = [];
          colTable.push(<td>{val.employee_name}</td>, <td>{val.employee_salary}</td>, <td>{val.employee_age}</td>)
          rowTable.push(<tr>{colTable}</tr>)

          });
          
          this.setState({
            dataBlocks: rowTable,
          })

      });
    });
    //console.log(this.state.dataBlocks);
    
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Dashboard
            </Link>
          </div>
        </nav>
        
        <div className="container containerDash">
          <Row>
            <Col>
              <DropdownButton id="dropdown-item-button" title="Dropdown button">
                <Dropdown.Item as="button">Action</Dropdown.Item>
                <Dropdown.Item as="button">Another action</Dropdown.Item>
                <Dropdown.Item as="button">Something else</Dropdown.Item>
              </DropdownButton>
            </Col>

            <Col>
              <DropdownButton id="dropdown-item-button" title="Expiry">
                <Dropdown.Item as="button">Action</Dropdown.Item>
                <Dropdown.Item as="button">Another action</Dropdown.Item>
                <Dropdown.Item as="button">Something else</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </div>

        <div className="container">
        <div className="table-responsive">
          <h1>Data</h1>
          <br />
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Salary</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody id="TableData">
              {this.getTableData()}
              {this.state.dataBlocks}
            </tbody>
          </table>
        </div>
      </div>

      </div>
    )
  }
}

export default Dashboard
