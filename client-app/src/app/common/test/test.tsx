import React from 'react'
 
export interface ITest {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

function test() {

    let d1 : Date = new Date(); 

    return (
        
        <div>
            <h1>Date {d1.toISOString().split('T')[0]} - Time : {d1.getTime()} </h1>
        </div>
    )
}

export default test
