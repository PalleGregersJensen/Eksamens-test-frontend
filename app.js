"use strict"

import { getVacantShifts } from "./rest-api.js";

window.addEventListener("load", start);

// Get data from backend
async function start() {
    console.log("App is runnning");
    const vacantShifts = await getVacantShifts();
    console.log(vacantShifts);
    showDataOnWebsite(vacantShifts);
}

// Display data on website
function showDataOnWebsite(shiftsList) {
  for (const shift of shiftsList) {
    const vacantShiftsHtml = /*html*/ `${shift.Year}-${shift.Date}-${shift.Time}-${shift.LengthOfShift}`;
    document.querySelector("#vacant-shifts-container").insertAdjacentHTML("beforeend", vacantShiftsHtml);
  }
}