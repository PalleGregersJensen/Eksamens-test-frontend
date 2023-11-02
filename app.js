"use strict"

import { getVacantShifts } from "./rest-api.js";

window.addEventListener("load", start);

async function start() {
    console.log("App is runnning");
    const vacantShifts = await getVacantShifts();
    console.log(vacantShifts);
}