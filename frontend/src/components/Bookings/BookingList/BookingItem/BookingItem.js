import React from 'react';

const bookingItem = props => (  
    <tbody>
    {props.userId === props.Proid || props.userId === props.Stuid || props.userrole === "ADMIN" ? (
        <tr>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.bookingId}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.ProName}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.StuName}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.start}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.end}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.timeslotcreatedAt}</p>
            </td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button type="button" class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.onDelete.bind(this, props.bookingId)}>Cancel Booking</button>
            </td>
        </tr>
    ) : (
        <p></p>
    )}
    </tbody>
);

export default bookingItem;