document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    const googleSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeIykK-tI4MMDliMOOul-4V2GfyYMuqkQITCXVGcAwqZ4lYx-8PosdTz6k5nZ9-BFJqUlPu9jWp1DU/pub?output=csv";

    fetch(googleSheetURL)
        .then(response => response.text())
        .then(csvData => {
            const items = parseCSV(csvData);
            const item = items.find(i => i.id === itemId);

            if (item) {
                document.getElementById("itemTitle").textContent = item.title;
                document.getElementById("itemImage").src = item.image;
                document.getElementById("itemImage").alt = item.title;
                document.getElementById("itemRating").textContent = item.rating;
                document.getElementById("itemDescription").textContent = item.description;
                document.getElementById("itemCategory").textContent = item.category;
            } else {
                document.body.innerHTML = "<h2>Item not found</h2><a href='index.html'>← Back</a>";
            }
        })
        .catch(error => console.error("Error loading item:", error));

    function parseCSV(csv) {
        const lines = csv.split("\n");
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
            const data = lines[i].split(",");
            if (data.length === headers.length) {
                result.push({
                    id: data[0].trim(),
                    title: data[1].trim(),
                    image: data[2].trim(),
                    rating: data[3].trim(),
                    category: data[4].trim(),
                    description: data[5].trim()
                });
            }
        }
        return result;
    }
});