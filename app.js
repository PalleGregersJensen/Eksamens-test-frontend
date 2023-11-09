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
  // document.querySelector("#vacant-shifts-container").innerHTML = "";
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

      document.querySelector("#book-shift-form").addEventListener("submit", () => bookSpecificShift(employee));
    }
    // document.querySelector("#book-shift-form").addEventListener("submit", bookSpecificShift);
  }

  // book specific shift (update functionality)
  async function bookSpecificShift(employeeObject) {
    event.preventDefault();
    console.log("book shift");
    const form = event.target;
    console.log(employeeObject);
    console.log(employeeObject.EmployeeID);
    form.reset();
    const employeeAsJson = JSON.stringify(employeeObject);
    const response = await fetch(`${endpoint}/vacant_shifts/${shiftObject.ShiftID}`, {
      method: "PUT",
      body: employeeAsJson,
      headers: {
        "content-Type": "application/json",
      },
    });
    if (response.ok) {
      // if success, run start
      start();
    }
  }
}



function updateArtistClicked(artistObject) {
  selectedArtist = artistObject;
  console.log(selectedArtist);
  const form = document.querySelector("#form-update-artist");
  form.image.value = artistObject.image;
  form.name.value = artistObject.name;
  form.birthdate.value = artistObject.birthdate;
  form.elements["active-since"].value = artistObject.activeSince;
  form.genres.value = artistObject.genres;
  form.labels.value = artistObject.labels;
  form.website.value = artistObject.website;
  form.elements["short-description"].value = artistObject.shortDescription;
  document.querySelector("#dialog-update-artist").showModal();
}

async function updateArtist(event) {
  closeDetailView();
  console.log("update artist");
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.elements["active-since"].value;
  const image = form.image.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const shortDescription = form.elements["short-description"].value;
  // update user
  const artistToUpdate = { name, birthdate, activeSince, image, genres, labels, website, shortDescription };
  console.log(artistToUpdate);
  console.log(selectedArtist.id);
  const artistAsJson = JSON.stringify(artistToUpdate);
  const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
    method: "PUT",
    body: artistAsJson,
    headers: {
      "content-Type": "application/json",
    },
  });
  if (response.ok) {
    // if success, run start
    start();
  }
}

