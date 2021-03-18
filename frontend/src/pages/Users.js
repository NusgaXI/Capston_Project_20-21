import React, { Component } from 'react';
import { ExcelRenderer } from "react-excel-renderer";
import MainNavigation from './../components/Navigation/MainNavigation';
import AuthContext from '../context/auth-context';
import UserList from '../components/Users/UserList/UserList';
import Modal from '../components/Modal/Modal';

class UsersPage extends Component {

  state = {
    creating: false,
    users: [],
    rows: [],
    cols: []
  };

  constructor(props) {
    super(props);
    this.NetIDElRef = React.createRef();
    this.fullNameElRef = React.createRef();
    this.emailElRef = React.createRef();
    this.NetPasswordElRef = React.createRef();
    this.roleElRef = React.createRef();
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }

      for (var i = 0; i < this.state.rows.length; i++) {
          const NetID = this.state.rows[i][0];
          const fullName = this.state.rows[i][1];
          const email = this.state.rows[i][2];
          const NetPassword = this.state.rows[i][3];
          const role = this.state.rows[i][4];

          const user = {NetID, fullName, email, NetPassword, role};
          console.log(user);

          const requestBody = {
            query: `
              mutation {
                createUser(userInput: {NetID:"${NetID}", fullName: "${fullName}", email: "${email}", NetPassword: "${NetPassword}", role: "${role}"}) {
                  _id
                  NetID
                  fullName
                  email
                  role
                }
              }
            `
          };

          const token = this.context.token;

          fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
              }
              return res.json();
            })
            .then(resData => {
              this.setState(prevState => {
                const updatedUsers = [...prevState.users];
                updatedUsers.push({
                  _id: resData.data.createUser._id,
                  NetID: resData.data.createUser.NetID,
                  fullName: resData.data.createUser.fullName,
                  email: resData.data.createUser.email,
                  role: resData.data.createUser.role
                });
                return {users: updatedUsers};
              });
            })
            .catch(err => {
              console.log(err);
            });
      }

    });

  }

  componentDidMount() {
    this.fetchUsers();
  }

  static contextType = AuthContext;

  startCreateUserHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const NetID = this.NetIDElRef.current.value;
    const fullName = this.fullNameElRef.current.value;
    const email = this.emailElRef.current.value;
    const NetPassword = this.NetPasswordElRef.current.value;
    const role = this.roleElRef.current.value;

    if (
      NetID.trim().length === 0 ||
      fullName.trim().length === 0 ||
      email.trim().length === 0 || 
      NetPassword.trim().length === 0 || 
      role.trim().length === 0
      ) {
        return;
      }

    const user = {NetID, fullName, email, NetPassword, role};
    console.log(user);

    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {NetID:"${NetID}", fullName: "${fullName}", email: "${email}", NetPassword: "${NetPassword}", role: "${role}"}) {
            _id
            NetID
            fullName
            email
            role
          }
        }
      `
    };

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push({
            _id: resData.data.createUser._id,
            NetID: resData.data.createUser.NetID,
            fullName: resData.data.createUser.fullName,
            email: resData.data.createUser.email,
            role: resData.data.createUser.role
          });
          return {users: updatedUsers};
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  modalCancelHandler = () => {
    this.setState({ creating: false });
  }

  fetchUsers() {
    const requestBody = {
      query: `
        query {
          users {
            _id
            NetID
            fullName
            email
            role
          }
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const users = resData.data.users;
        this.setState({users: users});
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        {this.state.creating && (
        <Modal 
          title="Create User" 
          canCancel 
          canConfirm
          onCancel={this.modalCancelHandler}
          onConfirm={this.modalConfirmHandler}
        >
          <form>
            <div class="flex flex-col">
              <label class="leading-loose">NetID</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="text" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.NetIDElRef} />
              </div>
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">Full Name</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="text" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.fullNameElRef} />
              </div>
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">Email</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="email" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.emailElRef} />
              </div>
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">Password</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="password" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.NetPasswordElRef} />
              </div>
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">Role</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <select class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.roleElRef}>
                  <option value="ADMIN">Admin</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
        )}
  
        <div class="container mx-auto mt-10 px-4 border-2 border-b-2 rounded-md h-auto">
          <div class="h-full m-3">
            <p class="text-2xl mb-5 w-auto">Users</p>
            {this.context.token && (
              <button type="button" class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm" onClick={this.startCreateUserHandler}>Create User</button>
            )}
            <div class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                <label class="flex flex-col items-center bg-red text-white rounded-lg cursor-pointer hover:text-white">
                    <span>Import</span>
                    <input type='file' class="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={this.fileHandler.bind(this)} />
                </label>
            </div>
            <UserList 
                users={this.state.users} 
            />

          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default UsersPage;