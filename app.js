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
  // document.querySelector("#vacant-shifts-container").innerHTML = "";
  for (const shift of shiftsList) {
    const isoDateString = shift.Date;
    const date = new Date(isoDateString);
    const vacantShiftsHtml = /*html*/ `<div id=${isoDateString}>Dato for vagt: <br> ${date}. <br> Start på vagt: <br> ${shift.Time}. <br> Længde af vagt: <br> ${shift.LengthOfShift}</div>`;
    document.querySelector("#vacant-shifts-container").insertAdjacentHTML("beforeend", vacantShiftsHtml);

    document.querySelector("#vacant-shifts-container div:last-child ").addEventListener("click", () => vacantShiftClicked(shift));
  }
  };


function vacantShiftClicked(shiftObject) {
  console.log(shiftObject);
}
