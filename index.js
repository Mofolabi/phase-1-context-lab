function createEmployeeRecord(fourElementArray) {
    let [firstName, familyName, title, payPerHour] = fourElementArray;
    let objectBuilt = {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
    return objectBuilt;
  }
  
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((member) => {
      return createEmployeeRecord(member);
    });
  }
  

  
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  }
  
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return this;
  }
  
function hoursWorkedOnDate(dateArg) {
    let inEvents = this.timeInEvents.find((e) => e.date === dateArg);
    let outEvents = this.timeOutEvents.find((e) => e.date === dateArg);
    return (outEvents.hour - inEvents.hour) / 100;
  }
  
  
  function wagesEarnedOnDate(dateArg) {
    let raw = hoursWorkedOnDate.call(this, dateArg) * this.payPerHour;
    return parseFloat(raw.toString());
  }
  
const allWagesFor = function () {
    let avaiableDates = this.timeInEvents.map((obj) => obj.date);
    let payable = avaiableDates.reduce(
      function (accumulator, value) {
        return accumulator + wagesEarnedOnDate.call(this, value);
      }.bind(this),
      0
    );
    return payable;
  };
  
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find((obj) => obj.firstName === firstNameString);
  }
  
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((accumulator, value) => {
      return accumulator + allWagesFor.call(value);
    }, 0);
  }
  
 
