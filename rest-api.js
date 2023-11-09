const endpoint = "http://localhost:3000";

// get vacant shifts from backend
async function getVacantShifts() {
    const response = await fetch(`${endpoint}/vacant_shifts`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}

// get employees from backend
async function getEmployees() {
    const response = await fetch(`${endpoint}/employees`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}


export { endpoint };
export { getVacantShifts };
export { getEmployees };