

let json = {};
//const file = "/../../hitest/codes.json";
const file = "/src/hitest/codes.json";
let remainingCodes = [];
let totalCount;

const downloadBtn = document.getElementById("down");

window.addEventListener("DOMContentLoaded", () => {

    fetch(file)
        .then(response => response.json())
        .then(data => {
            console.log("JSON loaded");
            json = data;
            remainingCodes = Object.keys(data);
            totalCount = remainingCodes.length;
            document.getElementById("total-count").textContent = totalCount;
            document.getElementById("count").textContent = remainingCodes.length.toString();
            hideMessageDiv();
        })
        .catch(() => showMessage('Cannot load JSON'));
})


function drawRandomCode() {
    if (remainingCodes.length === 0) {
        showMessage("Keine Codes mehr verfügbar");
        return;
    }

    // Zufälligen Index wählen
    const randomIndex = Math.floor(Math.random() * remainingCodes.length);

    // Code holen
    let code = remainingCodes[randomIndex];
    code = code.slice(0, 3) + " " + code.slice(3);

    // Aus Liste entfernen (damit er nicht nochmal gezogen wird)
    remainingCodes.splice(randomIndex, 1);

    // Status anzeigen
    document.getElementById("count").textContent = remainingCodes.length.toString();

    codeInput.value = code;
    startPlay();
}

// Restliche Codes herunterladen
downloadBtn.addEventListener("click", function() {

    // CSV Header + Codes
    const csvContent =
        "code\n" +
        remainingCodes.join("\n");

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "remaining_codes.csv";
    a.click();

    URL.revokeObjectURL(url);
});


// restliche Codes hochladen
document.getElementById("csvInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;

        // Zeilen aufteilen (Windows + Mac kompatibel)
        let lines = text.split(/\r?\n/);

        // Leere Zeilen entfernen
        lines = lines.filter(line => line.trim() !== "");

        // Falls Header vorhanden (z.B. "code") → entfernen
        if (lines[0].toLowerCase().includes("code")) {
            lines.shift();
        }

        remainingCodes = lines;
        console.log("Remaining codes loaded");


        document.getElementById("count").textContent = remainingCodes.length.toString();
    };

    reader.readAsText(file);
});