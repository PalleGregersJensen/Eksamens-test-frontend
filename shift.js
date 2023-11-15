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

            // document
            //     .querySelector("#vacant-shifts-container div:last-child")
            //     .addEventListener("click", () => vacantShiftClicked(shift));
        }
    }
    insertEmployeesIntoDatalist(employeesList) {
        console.log(employeesList);
        document.querySelector("#book-shift-datalist").innerHTML = "";
        for (const employee of employeesList) {
            const employeeHtml = /*html*/ `<option value = "${employee.FirstName} ${employee.LastName}">`;
            document.querySelector("#book-shift-datalist").insertAdjacentHTML("beforeend", employeeHtml);
            console.log(employeeHtml);

            //   document.querySelector("#book-shift-form").addEventListener("submit", bookSpecificShift);
        }
        // document.querySelector("#book-shift-form").addEventListener("submit", bookSpecificShift);
    }
        // vacant shift clicked
        vacantShiftClicked(shiftObject) {
            console.log(shiftObject);
            // shift.insertEmployeesIntoDatalist(employees);
            // console.log(employees);
            document.querySelector("#book-shift-dialog").showModal();
    
        }

    }
