import { platform, freemem, homedir, hostname, networkInterfaces } from 'os';

function showOSInfo() { 
    console.log("Platform:", platform()); 
    console.log("Free memory:", freemem() / (1024 ** 3), "GB");
    console.log("Home directory:", homedir()); 
    console.log("Hostname:", hostname()); 
    console.log("Network interfaces:", networkInterfaces()); 
} 

export function checkMemory() { 
    const freeGB = freemem() / (1024 ** 3); 
    if (freeGB > 4) { 
        console.log("✅ Free memory is more than 4GB:", freeGB.toFixed(2), "GB");
    }
    else {
        console.log("⚠️ Free memory is less than 4GB:", freeGB.toFixed(2), "GB"); 
    } 
}

export function runWithAccess() { 
    const mode = process.env.MODE; if (mode === "admin") { 
        console.log("Access granted (MODE=admin). Showing OS info:"); 
        showOSInfo(); 
    } 
    else { 
        console.log("Access denied (MODE=user). OS info is restricted."); 
    } 
}