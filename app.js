"use strict";

import { getVacantShifts, getEmployees, endpoint } from "./rest-api.js";

// Global variable
let employees = [];

window.addEventListener("load", start);

// Get data from backend
async function start() {
  console.log("App is runnning");
  const vacantShifts = await getVacantShifts();
  console.log(vacantShifts);
  showDataOnWebsite(vacantShifts);
  employees = await getEmployees();
  console.log(employees);
  // insertEmployeesIntoDatalist(employees);
}

// Display data on website
function showDataOnWebsite(shiftsList) {
  document.querySelector("#vacant-shifts-container").innerHTML = "";
  for (const shift of shiftsList) {
    const isoDateString = shift.Date;
    const date = new Date(isoDateString);
    // Hvis EmployeeID er null
    if (shift.EmployeeID === null) {
      shift.EmployeeID = "Ingen";
    }
    const vacantShiftsHtml = /*html*/ `<div id=${isoDateString}>Dato for vagt: <br> ${date}. <br> Start på vagt: <br> ${shift.Time}. <br> Længde af vagt: <br> ${shift.LengthOfShift} <br> Denne vagt er taget af: <br> ${shift.EmployeeID}</div>`;
    document.querySelector("#vacant-shifts-container").insertAdjacentHTML("beforeend", vacantShiftsHtml);

    document
      .querySelector("#vacant-shifts-container div:last-child")
      .addEventListener("click", () => vacantShiftClicked(shift));
  }
}

// vacant shift clicked
function vacantShiftClicked(shiftObject) {
  console.log(shiftObject);
  insertEmployeesIntoDatalist(employees);
  console.log(employees);
  document.querySelector("#book-shift-dialog").showModal();

  // insert employees array into datalist
  function insertEmployeesIntoDatalist(employeesList) {
    console.log(employeesList);
    document.querySelector("#book-shift-datalist").innerHTML = "";
    for (const employee of employeesList) {
      const employeeHtml = /*html*/ `<option value = "${employee.FirstName} ${employee.LastName}">`;
      document.querySelector("#book-shift-datalist").insertAdjacentHTML("beforeend", employeeHtml);
      console.log(employeeHtml);

      document.querySelector("#book-shift-form").addEventListener("submit", ()=> bookSpecificShift(employee));
    }
    // document.querySelector("#book-shift-form").addEventListener("submit", bookSpecificShift);
  }

  // book specific shift (update functionality)
  async function bookSpecificShift(employeeObject) {
    event.preventDefault();
    console.log("book shift");
    console.log(employeeObject);
    const form = event.target;
    // const fullName = form.employee.value;
    // console.log(fullName);
    const foundEmployee = employees.find((employee) => employee.EmployeeID === employeeObject.EmployeeID);
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
}

