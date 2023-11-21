import { start, bookSpecificShiftAppJs, employees } from "./app.js";
import { endpoint } from "./rest-api.js";

export default class Shift {
  constructor(Date, Time, LengthOfShift, EmployeeID) {
    this.Date = Date;
    this.Time = Time;
    this.LengthOfShift = LengthOfShift;
    this.EmployeeID = EmployeeID;
  }
  // Display data on website
  showDataOnWebsite(shiftsList) {
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
        .addEventListener("click", () => this.vacantShiftClicked(shift));
    }
  }
  insertEmployeesIntoDatalist(employeesList) {
    console.log(employeesList);
    document.querySelector("#book-shift-datalist").innerHTML = "";
    for (const employee of employeesList) {
      const employeeHtml = /*html*/ `<option value = "${employee.FirstName} ${employee.LastName}">`;
      document.querySelector("#book-shift-datalist").insertAdjacentHTML("beforeend", employeeHtml);
      console.log(employeeHtml);

      // document.querySelector("#book-shift-form").addEventListener("submit", () => this.bookSpecificShift);
    }
  }
  // vacant shift clicked
  vacantShiftClicked(shiftObject) {
    console.log(shiftObject);
    // console.log(this);
    document.querySelector("#book-shift-dialog").showModal();
    document.querySelector("#book-shift-form").addEventListener("submit", (event) => bookSpecificShiftAppJs(event, shiftObject));
    console.log(shiftObject);
  }

  // book specific shift (update functionality)
  async bookSpecificShift(event, shiftObject) {
    event.preventDefault();
    console.log(this);
    console.log("book shift");
    const form = event.target;
    console.log(form);
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
}
