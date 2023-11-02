const endpoint = "http://localhost:3000";

async function getVacantShifts() {
    const response = await fetch(`${endpoint}/vacant_shifts`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}


export { endpoint };
export { getVacantShifts };