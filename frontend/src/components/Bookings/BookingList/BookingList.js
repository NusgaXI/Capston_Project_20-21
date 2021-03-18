import React from 'react';

import BookingItem from './BookingItem/BookingItem'

const bookingList = props =>{
    const bookings = props.bookings.map(booking => {
        return(
            <BookingItem 
                bookingId={booking._id} 
                ProName={booking.timeslot.creator.fullName}
                StuName={booking.user.fullName}
                start={booking.timeslot.startAt}
                end={booking.timeslot.endAt}
                timeslotcreatedAt={booking.createdAt}
                userId={props.authUserId}
                userrole={props.authUserrole}
                Proid={booking.timeslot.creator._id}
                Stuid={booking.user._id}
                onDelete={props.onDelete}
            />
        )
    });

return(
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Professor Name
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Student Name
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        From
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        To
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created At
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                    </th>
                  </tr>
                </thead>
                  {bookings}
              </table>
        </div>
        </div>

            
)};

export default bookingList;