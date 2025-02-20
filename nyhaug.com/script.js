document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("gridContainer");
    const sortAscButton = document.getElementById("sortAsc");
    const sortDescButton = document.getElementById("sortDesc");
    const categorySelect = document.getElementById("categorySelect");

    let items = [];

    // ✅ Correct Google Sheets CSV URL
    const googleSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeIykK-tI4MMDliMOOul-4V2GfyYMuqkQITCXVGcAwqZ4lYx-8PosdTz6k5nZ9-BFJqUlPu9jWp1DU/pub?output=csv";

    // ✅ Fetch Google Sheets Data
    fetch(googleSheetURL)
        .then(response => response.text())
        .then(csvData => {
            console.log("CSV Raw Data:", csvData); // Debugging
            items = parseCSV(csvData);
            console.log("Parsed Items:", items); // Debugging
            displayItems(items);
        })
        .catch(error => console.error("Error loading items:", error));

    // ✅ Corrected CSV Parsing Function
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
                    rating: parseInt(data[3].trim(), 10),
                    category: data[4].trim(),
                    description: data[5].trim()
                });
            }
        }
        return result;
    }

    // ✅ Display items in grid
    function displayItems(items) {
        gridContainer.innerHTML = ""; // Clear grid
        items.forEach(item => {
            const itemElement = document.createElement("a");
            itemElement.href = `item.html?id=${item.id}`;
            itemElement.classList.add("grid-item", "show");
            itemElement.setAttribute("data-rating", item.rating);
            itemElement.setAttribute("data-category", item.category);

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p class="rating">${item.rating}</p>
            `;

            gridContainer.appendChild(itemElement);
        });
        applyRatingColors();
    }

    // ✅ Apply rating colors
    function applyRatingColors() {
        document.querySelectorAll(".rating").forEach(ratingElement => {
            const ratingValue = parseInt(ratingElement.textContent);
            if (ratingValue >= 80) {
                ratingElement.style.color = "#2ecc71"; // Green
            } else if (ratingValue >= 60) {
                ratingElement.style.color = "#f1c40f"; // Yellow
            } else if (ratingValue >= 40) {
                ratingElement.style.color = "#e67e22"; // Orange
            } else if (ratingValue >= 20) {
                ratingElement.style.color = "#e74c3c"; // Red
            } else {
                ratingElement.style.color = "#8e44ad"; // Dark Purple
            }
        });
    }

    // ✅ Sorting function
    function sortGrid(ascending = true) {
        const sortedItems = [...items].sort((a, b) =>
            ascending ? a.rating - b.rating : b.rating - a.rating
        );
        displayItems(sortedItems);
    }

    // ✅ Filtering function
    function filterGrid(category) {
        const filteredItems = category === "all"
            ? items
            : items.filter(item => item.category === category);
        displayItems(filteredItems);
    }

    sortAscButton.addEventListener("click", () => sortGrid(true));
    sortDescButton.addEventListener("click", () => sortGrid(false));
    categorySelect.addEventListener("change", function () {
        filterGrid(this.value);
    });
});