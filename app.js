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
  // console.log(shift);
}

// Tilføj denne funktion for at definere bookSpecificShift i din app.js
function bookSpecificShiftAppJs(event, shiftObject) {
  event.preventDefault();
  console.log(event);
  console.log(shiftObject);
  shift.bookSpecificShift(event, shiftObject);
}

export { start, bookSpecificShiftAppJs, employees };
