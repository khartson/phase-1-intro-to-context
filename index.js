const { VirtualConsole } = require("jsdom");

// Your code here
function createEmployeeRecord(info) {
    let emp = {
        firstName:  info[0],
        familyName: info[1],
        title:      info[2],
        payPerHour: info[3],
        timeInEvents:   [], 
        timeOutEvents:  [], 
    };
    return emp; 
}

function createEmployeeRecords(employees) {

    return employees.map(createEmployeeRecord); 
}

function createTimeInEvent(employee, time) {
    // date given in 'YYYY-MM-DD HHMM'
    let info = {
        type: 'TimeIn',
        hour: parseInt(time.split(' ')[1]),  
        date: time.split(' ')[0],
    }
    employee.timeInEvents.push(info);
    return employee; 
}

function createTimeOutEvent(employee, time) {
    // same
    let info = {
        type: 'TimeOut',
        hour: parseInt(time.split(' ')[1]),  
        date: time.split(' ')[0],
    }
    employee.timeOutEvents.push(info);
    return employee; 
}

function hoursWorkedOnDate(employee, date) {
    // let timeIn = 0; 
    // let timeOut = 0; 
    // for (day of employee.timeInEvents) {
    //     if (date === day.date) {
    //         timeIn = day.hour; 
    //     }
    // }
    // for (day of employee.timeOutEvents) {
    //     if (date === day.date)
    //     timeOut = day.hour; 
    // }
    // return (timeOut - timeIn)/100;
    let timeIn = employee.timeInEvents
    .filter((day) => day.date === date)
    .map((date) => date.hour); 
    let timeOut = employee.timeOutEvents
    .filter((day) => day.date === date)
    .map((date) => date.hour); 
    
    return (timeOut - timeIn) / 100; 
}

function wagesEarnedOnDate(employee, date) {
    return (hoursWorkedOnDate(employee, date) * employee.payPerHour); 
}

function allWagesFor(employee) {
    let dates  = employee.timeInEvents.map((day) => day = day.date);
    let paySum = []; 
    for (let day of dates) {
        paySum.push(wagesEarnedOnDate(employee, day)); 
    }
    return paySum.reduce((p, c) => p + c, 0); 
}

function calculatePayroll(employees) {
    return employees.map((employee) => allWagesFor(employee))
    .reduce((p, c) => (p + c), 0); 
}