"use strict";

import { getVacantShifts, getEmployees, endpoint } from "./rest-api.js";
import Shift from "./shift.js";

// Global variable
let employees = [];
let shift;

window.addEventListener("load", start);

// Get data from backend
async function start() {
  console.log("App is runnning");
  const vacantShifts = await getVacantShifts();
  console.log(vacantShifts);
  employees = await getEmployees();
  console.log(employees);
  shift = new Shift();
  shift.showDataOnWebsite(vacantShifts);
}

// book specific shift (update functionality)
async function bookSpecificShift(employeeObject) {
  event.preventDefault();
  console.log("book shift");
  const form = event.target;
  const fullName = form.employee.value;
  console.log(fullName);
  const foundEmployee = employees.find((employee) => `${employee.FirstName} ${employee.LastName}` === fullName);
  console.log(foundEmployee);
  form.reset();
  const employeeAsJson = JSON.stringify(foundEmployee);
  console.log(employeeAsJson);
  const response = await fetch(`${endpoint}/vacant_shifts/${shiftObject.ShiftID}`, {
    method: "PUT",
    body: employeeAsJson,
    headers: {
      "content-Type": "application/json",
      credentials: "include",
    },
  });
  if (response.ok) {
    // if success, run start
    start();
  }
}
