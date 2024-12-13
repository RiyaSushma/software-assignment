import React, { useContext, useState } from 'react'
import { TrainContext } from '../State/TrainContext';

function WorkingSolution() {
    const { trainCoach, setTrainCoach } = useContext(TrainContext);

    const [requestedRow, setRequestedRow] = useState(1);
    const [info, setInfo] = useState([]);

    const [requestedSeats, setRequestedSeats] = useState(0);

    const [alert, setAlert] = useState({
        message: "",
        showAlert: false
    });

    // book seats

    const bookSeats = (e) => {
        e.preventDefault();
    
        if (requestedSeats <= 0) {
            setAlert({
                message: "Enter Valid no. of Seats",
                showAlert: true
            });
            return;
        }
    
        if (requestedSeats > 7) {
            setAlert({
                message: "You can book up to 7 seats at a time.",
                showAlert: true
            });
            return;
        }
    
        let remainingSeatsToBook = requestedSeats;
        let allBookedSeats = [];
    
        let startRow = requestedRow - 1; 
    
        for (let i = startRow; i < trainCoach[0].seats.row.length; i++) {
            let row = trainCoach[0].seats.row[i];
            let availableSeatsInRow = row.seats.filter(seat => seat.available);
    
            if (availableSeatsInRow.length > 0) {
                let seatsInThisRow = availableSeatsInRow.slice(0, remainingSeatsToBook);
                allBookedSeats = [...allBookedSeats, ...seatsInThisRow];
                remainingSeatsToBook -= seatsInThisRow.length;
    
                if (remainingSeatsToBook <= 0) {
                    break;
                }
            }
        }
    
        if (remainingSeatsToBook > 0) {
            setAlert({
                message: "Not enough seats available in the coach.",
                showAlert: true
            });
            return;
        }
    
        setTrainCoach(prevCoach => {
            const updatedSeats = prevCoach[0].seats.row.map(row => ({
                ...row,
                seats: row.seats.map(seat => {
                    if (allBookedSeats.some(booked => booked.seatNumber === seat.seatNumber)) {
                        return { ...seat, available: false };
                    }
                    return seat;
                }),
            }));
    
            return [{
                ...prevCoach[0],
                seats: {
                    ...prevCoach[0].seats,
                    row: updatedSeats
                }
            }];
        });
    
        console.log(allBookedSeats);

        setInfo(allBookedSeats);
    }

    const closeModal = () => {
        setAlert({
            message: "",
            showAlert: false
        })
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center'>
            <h1 className='font-bold text-lg mb-11'>
                TRAIN BOOKING COACHES
            </h1>

            {alert.showAlert && (
                <div className="flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative items-center" role="alert">
                    <strong className="font-bold">Error&nbsp;!</strong>
                    <span className="sm:inline h-6">&nbsp;{alert.message}</span>
                    <span className="top-0 bottom-0 right-0 px-4 py-3" onClick={closeModal}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            )}

            {info.length > 0 && (
                <div id="alert-additional-content-3" className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 w-full" role="alert">
                    <div class="flex items-center w-full">
                        <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <h3 class="text-lg font-medium">Success!</h3>
                    </div>
                    <h4 className='text-lg font-medium'>Booked Seats</h4>
                    <div className="flex items-center justify-center mt-2 mb-4 text-sm w-full">
                        {
                            info.map(infoElement => (
                                <div class="relative overflow-x-auto w-full">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Seat Number 
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td class="px-6 py-4">
                                                    {infoElement.seatNumber}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            ))
                        }
                    </div>
                    <div className="flex w-full">
                        <button type="button" className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close" onClick={() => setInfo([])}>
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            <div className='flex flex-col border border-white rounded-lg p-3 w-full'>
                <form className='flex flex-col p-4 gap-7 justify-center items-center' onSubmit={bookSeats}>
                    <div className='flex gap-11 w-72'>
                        <label className='flex w-36 justify-start'>No. of Seats</label>
                        <input type='number' value={requestedSeats} className='border border-white rounded w-16 p-2 h-7 bg-zinc-800' onChange={(e) => setRequestedSeats(e.target.value)}/>
                    </div>
                    <div className='flex gap-11 w-72'>
                        <label className='flex w-36 justify-start'>Requested Row</label>
                        <input type='number' value={requestedRow} className='border border-white rounded w-16 p-2 h-7 bg-zinc-800' onChange={(e) => setRequestedRow(e.target.value)}/>
                    </div>

                    <button>Submit</button>
                </form>  
            </div>

            <div className='mt-5'>
                <h2 className='font-bold text-lg mb-11'>Train Seat Availability</h2>
                <div className='flex mb-8'>
                    <div className='flex mb-2'>
                        <div className='w-4 h-4 bg-green-500 border border-white'>
                        </div>
                        <span className='font-bold text-sm ml-4'>Available Seats</span>
                    </div>
                    <div className='flex ml-6'>
                        <div className='w-4 h-4 bg-red-500 border border-white'>
                        </div>
                        <span className='font-bold text-sm ml-4'>Booked Seats</span>
                    </div>
                </div>
                {trainCoach.map((coach, index) => (
                    <div key={index}>
                        {
                            coach.seats.row.map((row, rowIndex) => (
                                <div key={rowIndex} className='flex gap-11'>
                                    <div className='flex items-center'>
                                        <button className='p-2 w-11 mb-5'>{row.row}</button>
                                    </div>
                                        
                                    <div className='flex gap-5 items-center'>
                                    {
                                        row.seats.map((seat, seatIndex) => (
                                            <div key={seatIndex} className='p-2 mb-5'>
                                                <button className={`w-20 ${seat.available ? "bg-green-500" : "bg-red-500"} hover:bg-black`}>
                                                    {seat.seatNumber}
                                                </button>
                                            </div>
                                        ))
                                    }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkingSolution;