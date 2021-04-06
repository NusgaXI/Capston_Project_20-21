import React, { Component } from 'react';
import MainNavigation from './../components/Navigation/MainNavigation';

import AuthContext from '../context/auth-context';
import BookingList from '../components/Bookings/BookingList/BookingList';

import Modal from '../components/Modal/Modal';

class BookingsPage extends Component {

  state = {
    isLoading: false,
    bookings: [],
    selectedDeleteBooking: null
};

static contextType = AuthContext;

componentDidMount() {
    this.fetchBookings();
}

modalCancelHandler = () => {
  this.setState({ selectedDeleteBooking: null });
}

fetchBookings = () => {
    this.setState({isLoading: true});
    const requestBody = {
        query: `
          query {
            bookings {
              _id
              createdAt
              user {
                _id
                fullName
              }
              timeslot {
                startAt
                endAt
                creator {
                  _id
                  fullName
                }
              }
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
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });

      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
};

showBookingDeleteHandler = bookingId => {
  this.setState(prevState => {
      const selectedDeleteBooking = prevState.bookings.find(b => b._id === bookingId);
      return {selectedDeleteBooking: selectedDeleteBooking};
  })
}

deleteBookingHandler = () => {
  if (!this.context.token) {
    this.setState({selectedDeleteBooking: null});
    return;
  }
    const requestBody = {
        query: `
          mutation {
            cancelBooking(bookingId: "${this.state.selectedDeleteBooking._id}")
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
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== this.state.selectedDeleteBooking._id;
          });
          return { bookings: updatedBookings};
        });
        this.setState({selectedDeleteBooking: null});
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
};



  render() {
    return(
    <React.Fragment>
    <MainNavigation />
    {this.state.selectedDeleteBooking && 
          <Modal 
            title="Cancel Booking Confirmation"
            canCancel 
            canConfirm 
            onCancel={this.modalCancelHandler}
            onConfirm={this.deleteBookingHandler}
          >
            <p>Are you confirm to cancel this booking?</p>
          </Modal>
        } 
    <div class="container mx-auto mt-10 px-4 border-2 border-b-2 rounded-md h-auto">
          <div class="h-full m-3">
            <p class="text-2xl mb-5 w-auto">Bookings</p>
              <BookingList 
              bookings={this.state.bookings} 
              authUserId={this.context.userId}
              authUserrole={this.context.role}
              onDelete={this.showBookingDeleteHandler} />
          </div>
    </div>
    </React.Fragment>
    );
  }
}

export default BookingsPage;