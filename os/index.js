// 1
import { config } from 'dotenv';
import { platform, freemem, homedir, hostname, networkInterfaces } from 'os';
config()

console.log("Имя: " + process.env.NAME)
console.log("Фамилия: " + process.env.SURNAME)
console.log("Группа: " + process.env.GROUP)
console.log("Номер по журналу: " + process.env.JOURNAL_NUMBER)

// 2
function showOSInfo() { 
    console.log("Platform:", platform()); 
    console.log("Free memory:", freemem() / (1024 ** 3), "GB");
    console.log("Home directory:", homedir()); 
    console.log("Hostname:", hostname()); 
    console.log("Network interfaces:", networkInterfaces()); 
} 

function checkMemory() { 
    const freeGB = freemem() / (1024 ** 3); 
    if (freeGB > 4) { 
        console.log("✅ Free memory is more than 4GB:", freeGB.toFixed(2), "GB");
    }
    else {
        console.log("⚠️ Free memory is less than 4GB:", freeGB.toFixed(2), "GB"); 
    } 
}

function runWithAccess() { 
    const mode = process.env.MODE; if (mode === "admin") { 
        console.log("Access granted (MODE=admin). Showing OS info:"); 
        showOSInfo(); 
    } 
    else { 
        console.log("Access denied (MODE=user). OS info is restricted."); 
    } 
}

checkMemory(); 
runWithAccess();