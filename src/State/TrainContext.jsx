import { createContext, useState } from "react";

export const TrainContext = createContext();

const TrainProvider = ({ children }) => {
    const seatCount = 80;
    const row_count = 7;

    const [trainCoach, setTrainCoach] = useState([
        {
            name: "Coach1",
            seats: {
                row: Array.from({ length: Math.ceil(seatCount/row_count) }, (_, i) => ({
                    row: i+1,
                    seats: Array.from(
                        { 
                            length: i+1 === Math.ceil(seatCount/row_count) && seatCount%row_count !== 0 ? seatCount%row_count : row_count
                        }, (_, j) => ({
                            seatNumber: j+1 + i*row_count,
                            available: true
                        }))
                    }))
            }
        }
    ]);


    return (
        <TrainContext.Provider value={{ trainCoach, setTrainCoach }}>
            {children}
        </TrainContext.Provider>
    )
}

export default TrainProvider;