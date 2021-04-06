import React, { Component } from 'react';
import moment from 'moment';
import MainNavigation from '../components/Navigation/MainNavigation';
import TimeslotList from '../components/Timeslots/TimeslotList/TimeslotList';
import AuthContext from '../context/auth-context';
import Modal from '../components/Modal/Modal';

class TimeslotsPage extends Component {
  state = {
    creating: false,
    timeslots: [],
    selectedBookingTimeslot: null,
    selectedDeleteTimeslot: null
  };

  constructor(props) {
    super(props);
    this.startAtElRef = React.createRef();
    this.endAtElRef = React.createRef();
    this.ProNameElRef = React.createRef();
    this.DateElRef = React.createRef();
    this.durationElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchTimeslots();
  }

  clearsearch = () => {
    this.fetchTimeslots();
  }

  static contextType = AuthContext;

  startCreateTimeslotHandler = () => {
    this.setState({ creating: true });
  };

  timeslotloopHandler = () => {
    this.setState({ creating: false });
    const date = this.DateElRef.current.value;
    const start = this.startAtElRef.current.value;
    const end = this.endAtElRef.current.value;
    const duration = this.durationElRef.current.value;

    if (
      date.trim().length === 0 ||
      start.trim().length === 0 ||
      end.trim().length === 0 ||
      duration.trim().length === 0
      ) {
        return;
      }

    var startat = moment(date + "T" + start);
    const endat = moment(date + "T" + end);
    var times = [startat.format()];
    const minutes_diff = 60000 * duration;
    const diff = endat.diff(startat);

    const duration_inminute = Math.floor(diff/minutes_diff);

    for (var i = 0; i < duration_inminute; i++) {
      startat = moment(startat).add(duration, 'm')
      times.push(startat.format())
      this.modalConfirmHandler(times[i], times[i+1])
    };
    
  };

  modalConfirmHandler = (startat, endat) => {
    this.setState({ creating: false });

    const timeslot = {startat, endat};
    console.log(timeslot);

    const requestBody = {
      query: `
        mutation {
          createTimeslot(timeslotInput: {startAt: "${startat}", endAt: "${endat}"}) {
            _id
            startAt
            endAt
            status
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
          const updatedTimeslots = [...prevState.timeslots];
          updatedTimeslots.push({
            _id: resData.data.createTimeslot._id,
            startAt: resData.data.createTimeslot.startAt,
            endAt: resData.data.createTimeslot.endAt,
            status: resData.data.createTimeslot.status,
            creator: {
              _id: this.context.userId,
              fullName: this.context.fullName
            }
          });
          return {timeslots: updatedTimeslots};
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedBookingTimeslot: null, selectedDeleteTimeslot: null });
  }

  fetchTimeslots() {
    const requestBody = {
      query: `
        query {
          timeslots {
            _id
            startAt
            endAt
            status
            creator {
              _id
              fullName
            }
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
        const timeslots = resData.data.timeslots;
        this.setState({timeslots: timeslots});
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchTimeslotHandler = () => {
    const ProName = this.ProNameElRef.current.value;

    if (
      ProName.trim().length === 0
      ) {
        return;
      }
    
    const requestBody = {
      query: `
        query {
          searchUsers(fullname: "${ProName}"){
            _id
            startAt
            endAt
            status
            creator {
              _id
              fullName
            }
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
        const timeslots = resData.data.searchUsers;
        console.log(timeslots)
        this.setState({timeslots: timeslots});
      })
      .catch(err => {
        console.log(err);
      });
  }

  showBookconfirmHandler = timeslotId => {
    this.setState(prevState => {
        const selectedBookingTimeslot = prevState.timeslots.find(t => t._id === timeslotId);
        return {selectedBookingTimeslot: selectedBookingTimeslot};
    })
  }

  bookTimeslotHandler = () => {
    if (!this.context.token) {
      this.setState({selectedBookingTimeslot: null});
      return;
    }
    const requestBody = {
      query: `
        mutation {
          bookTimeslot(timeslotId: "${this.state.selectedBookingTimeslot._id}") {
            _id
            createdAt
            updatedAt
          }
        }
      `
    };

  fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.context.token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      this.fetchTimeslots();
      this.setState({selectedBookingTimeslot: null});
    })
    .catch(err => {
      console.log(err);
    });
  }

  showTimeslotDeleteHandler = timeslotId => {
    this.setState(prevState => {
        const selectedDeleteTimeslot = prevState.timeslots.find(t => t._id === timeslotId);
        return {selectedDeleteTimeslot: selectedDeleteTimeslot};
    })
  }

  deleteTimeslotHandler = () => {
      if (!this.context.token) {
        this.setState({selectedDeleteTimeslot: null});
        return;
      }
      const requestBody = {
          query: `
            mutation {
              cancelTimeslot(timeslotId: "${this.state.selectedDeleteTimeslot._id}")
            }
          `
        };
  
      fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token
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
            const updatedTimeslots = prevState.timeslots.filter(timeslot => {
              return timeslot._id !== this.state.selectedDeleteTimeslot._id;
            });
            return { timeslots: updatedTimeslots};
          });
          this.setState({selectedDeleteTimeslot: null});
  
        })
        .catch(err => {
          console.log(err);
        });
  };

  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        {this.state.creating && (
        <Modal 
          title="Create Timeslot" 
          canCancel 
          canConfirm
          onCancel={this.modalCancelHandler}
          onConfirm={this.timeslotloopHandler}
        >
          <form>
            <div class="flex flex-col">
              <label class="leading-loose">Date</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="date" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.DateElRef} />
              </div>
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">Start At</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="time" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.startAtElRef} />
              </div>
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">End At</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <input type="time" class="pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" ref={this.endAtElRef} />
              </div>
            </div>
            <div class="flex flex-col">
                <label class="leading-loose">Duration</label>
                <div class="relative focus-within:text-gray-600 text-gray-400">
                <input class="w-full rounded border p-2" type="text" placeholder="minutes" name="Duration" ref={this.durationElRef}/>
                </div>
            </div>
          </form>
        </Modal>
        )}

        {this.state.selectedBookingTimeslot && 
          <Modal 
            title="Booking Confirmation"
            canCancel 
            canConfirm 
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookTimeslotHandler}
          >
            <p>Are you confirm to book this timeslot?</p>
          </Modal>
        }

        {this.state.selectedDeleteTimeslot && 
          <Modal 
            title="Delete Confirmation"
            canCancel 
            canConfirm 
            onCancel={this.modalCancelHandler}
            onConfirm={this.deleteTimeslotHandler}
          >
            <p>Are you confirm to delete this timeslot?</p>
          </Modal>
        } 
  
        <div class="container mx-auto mt-10 px-4 border-2 border-b-2 rounded-md h-auto">
          <div class="h-full m-3">
            <p class="text-2xl mb-5 w-auto">Timeslots</p>
            {this.context.token && (this.context.role !== "STUDENT") && (
              <button type="button" class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm" onClick={this.startCreateTimeslotHandler}>Create Timeslot</button>
            )}
            {this.context.token && (this.context.role !== "PROFESSOR") && (
                <div class="w-full inline-flex justify-center mb-2 rounded-md text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  <input class="w-full rounded border p-2" type="text" placeholder="Professor Name" name="Search" ref={this.ProNameElRef}/>
                  <button type="submit" class="bg-red-600 hover:bg-red-700 rounded text-white px-4 py-2" onClick={this.searchTimeslotHandler}>Search</button>
                </div>
            )}
            {this.context.token && (this.context.role !== "PROFESSOR") && (
            <button type="button" class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={this.clearsearch}>Clear</button>
            )}
   

              <TimeslotList 
                timeslots={this.state.timeslots} 
                authUserId={this.context.userId}
                authUserrole={this.context.role}
                onBookConfirmation={this.showBookconfirmHandler}
                onDelete={this.showTimeslotDeleteHandler}
              />

          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default TimeslotsPage;