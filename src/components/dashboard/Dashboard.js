import React, { Component } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { Row, Col, Dropdown, DropdownButton, Button} from 'react-bootstrap';

import "./DashboardStyle.css";

class Dashboard extends Component {

  state = {
    tickerValue: 'Ticker',
    expiryValue: '',
    strikeDistanceValue: '',
    totContractsValue: '',
    dataBlocks: [],
  }

  updateTickerLabel = (event) => {
    //console.log(event);
    this.setState({
      tickerValue: event,
    })
  }

  updateExpiryLabel = (event) => {
    this.setState({
      expiryValue: event,
    })
  }

  updateStrikeDistanceLabel = (event) => {
    this.setState({
      strikeDistanceValue: event,
    })
  }

  updateTotContractsLabel = (event) => {
    this.setState({
      totContractsValue: event,
    })
  }

  contractNumbersList = () => {
    const contractNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return (
      <div>
        {
          contractNumbers.map((val, index) => (
            <Dropdown.Item eventKey={index+1}>{val}</Dropdown.Item>
          ))
        }  
      </div>
    );
    
  }

  submitHandler = (event) => {
    event.preventDefault();

    clearInterval(this.interval);

    const reqData = {
      ticker: this.state.tickerValue,
      expiry: this.state.expiryValue,
      strikeDistance: this.state.strikeDistanceValue,
      totContracts: this.state.totContractsValue,
    }
    
    console.log('request:', reqData)
    /*axios
    .post("https://jsonplaceholder.typicode.com/posts", reqData)
    .then((response) => {
      console.log("post response: ", response)

          this.interval = setInterval(() => {
            axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
              console.log("get res: ",response)
            })
            .catch((error) => {
              console.log(error)
            })
          }, 5000);

    })
    .catch((error) => {
      console.log(error)
    })*/

   
    this.interval = setInterval(async () => {
      fetch(`http://localhost:5000/quotes?ticker=${this.state.tickerValue}&expiry=${this.state.expiryValue}&strikeDistance=${this.state.strikeDistanceValue}&totContracts=${this.state.totContractsValue}`)
        .then((response) => {
          console.log('url post:',response)
        })
        .catch((error) => {
          console.log(error)
        })
    }, 5000);
    
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
        <form onSubmit={this.submitHandler}>
          <Row>
            <Col>
              <DropdownButton 
                id="tickerDropdownMenu"
                title={this.state.tickerValue} 
                onSelect={this.updateTickerLabel}
              >
                <Dropdown.Item eventKey="NIFTY">NIFTY</Dropdown.Item>
                <Dropdown.Item eventKey="BANKNIFTY">BANKNIFTY</Dropdown.Item>
              </DropdownButton>
            </Col>

            <Col>
              <DropdownButton 
                id="expiryDropdownMenu"
                title={`Expiry - ${this.state.expiryValue}`}
                onSelect={this.updateExpiryLabel}
              >
                <Dropdown.Item eventKey="21052020">2020-5-21</Dropdown.Item>
                <Dropdown.Item eventKey="28052020">2020-5-28</Dropdown.Item>
              </DropdownButton>
            </Col>

            <Col>
              <DropdownButton 
                id="strikeDistanceDropdownMenu"
                title={`Strike distance - ${this.state.strikeDistanceValue}`}
                onSelect={this.updateStrikeDistanceLabel}
              >
                <Dropdown.Item eventKey="50">50</Dropdown.Item>
                <Dropdown.Item eventKey="100">100</Dropdown.Item>
                <Dropdown.Item eventKey="500">500</Dropdown.Item>
              </DropdownButton>
            </Col>

            <Col>
              <DropdownButton 
                id="totContractsDropdownMenu"
                title={`No. of Contracts - ${this.state.totContractsValue}`} 
                onSelect={this.updateTotContractsLabel}
              >
                {this.contractNumbersList()}
              </DropdownButton>
            </Col>

            <Col>
              <Button type="submit" variant="success"> Show!! </Button>
            </Col>
            
          </Row>
        </form>
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
              {}
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
