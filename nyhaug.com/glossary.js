document.addEventListener("DOMContentLoaded", function () {
    const glossaryData = [
        { word: "BGAT", meaning: "Beste Gjennom Alle Tider (GOAT)" },
        { word: "Coil", meaning: "Rødcola, Skarp Cola, Cola med sukker" },
        { word: "Skjerashiii", meaning: "Hva skjer, kompis?" },
        { word: "hed?", meaning: "Hvor er du?" },
        { word: "hedlan?", meaning: "Hva er din lokasjon akkurat nå?" },
        { word: "UX", meaning: "User Experience" },
        { word: "HTTP", meaning: "HyperText Transfer Protocol" }
    ];

    const tableBody = document.getElementById("glossaryTable");

    glossaryData.forEach(entry => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.word}</td>
            <td>${entry.meaning}</td>
        `;
        tableBody.appendChild(row);
    });
});