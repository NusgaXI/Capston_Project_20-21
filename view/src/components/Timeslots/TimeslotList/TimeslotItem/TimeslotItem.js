import React from 'react';

const timeslotItem = props => (  
    <tbody>
    {props.userId === props.creatorId || props.userrole !== "PROFESSOR" ? (
        <tr>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.timeslotId}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.creatorName}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.start}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{props.end}</p>
            </td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {props.status === "Available" ? (
                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span class="relative">{props.status}</span>
                </span>
                ) : (
                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                <span class="relative">{props.status}</span>
                </span>
                )}
            </td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {props.userId === props.creatorId || props.userrole === "ADMIN" ?
                (   props.status === "Available" ?
                        (<button type="button" class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.onDelete.bind(this, props.timeslotId)}>Delete</button>
                        ) : (
                            <p></p>
                        )
                ) : (
                    props.status === "Available" ?
                        (<button type="button" class="w-full inline-flex justify-center mb-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.onBook.bind(this, props.timeslotId)}>Book</button>
                        ):(
                            <p></p>
                        )
                )}
            </td>
        </tr>
    ) : (
        <p></p>
    )}
    </tbody>
);

export default timeslotItem;