import React, { Component } from 'react';

import AuthContext from '../context/auth-context'
import photo from '../Photo/PolyU.png'
import polyu_icon from '../Photo/Poly_logo.png'

class AuthPage extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.NetIDEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const NetID = this.NetIDEl.current.value;
    const password = this.passwordEl.current.value;

    if (NetID.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(NetId: "${NetID}", password: "${password}") {
            userId
            token
            role
            fullName
            tokenExpiration
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
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.role,
            resData.data.login.fullName,
            resData.data.login.tokenExpiration,
          )
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
    <div class="w-full flex flex-wrap">
        <div class="w-2/3 shadow-2xl">
          <img class="object-cover w-full h-screen hidden md:block" src={photo} alt="PolyIcon" />
        </div>
        <div class="w-full md:w-1/3 flex flex-col">
            <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
    
              <img class="h-10 w-10" src={polyu_icon} alt="PolyU" />
            
            </div>

        <div class="flex flex-col justify-center md:justify-start my-auto pt-0 md:pl-12 md:pt-0 px-8 md:px-24">
            <p class="text-left text-3">Sign in with your NetID and NetPassword</p>
                <form class="flex flex-col pt-3 md:pt-0" onSubmit={this.submitHandler}>
                <div class="flex flex-col pt-4">
                    <input type="text" id="text" placeholder="NetID" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" ref={this.NetIDEl} />
                </div>

                <div class="flex flex-col pt-4">
                    <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" ref={this.passwordEl} />
                </div>

                <input type="submit" value="Log In" class="bg-red-700 text-white font-bold text-lg hover:bg-indigo-200 p-2 mt-8" />
                </form>
        </div>
        </div>
    </div>
    );
  }
}

export default AuthPage;