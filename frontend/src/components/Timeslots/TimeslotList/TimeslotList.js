import React from 'react';

import TimeslotItem from './TimeslotItem/TimeslotItem'

const timeslotList = props => {
    const timeslots = props.timeslots.map(timeslot => {
        return(
            <TimeslotItem 
                timeslotId={timeslot._id} 
                creatorName={timeslot.creator.fullName}
                start={timeslot.startAt}
                end={timeslot.endAt}
                status={timeslot.status}
                userId={props.authUserId}
                creatorId={timeslot.creator._id}
                userrole={props.authUserrole}
                onBook={props.onBookConfirmation}
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
                            Creator
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
                            Status
                        </th>
                        <th
                          class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
 
                        </th>
                      </tr>
                    </thead>
                      {timeslots}
                  </table>
            </div>
            </div>

                
)};

export default timeslotList;