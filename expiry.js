document.addEventListener("DOMContentLoaded", fetchExpiryAlerts);

function fetchExpiryAlerts() {
    const alertsContainer = document.getElementById("alerts-container");
    alertsContainer.innerHTML = "<p>Fetching expiry alerts...</p>";

    fetch("http://127.0.0.1:5500/expiry/alerts")
        .then(response => response.json())
        .then(data => {
            alertsContainer.innerHTML = "";
            const today = new Date();
            const oneMonthLater = new Date();
            oneMonthLater.setDate(today.getDate() + 30);

            data.forEach(item => {
                const expiryDate = new Date(item.expiry);
                const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                let alertClass = "";

                if (expiryDate <= today) {
                    alertClass = "expired";
                } else if (expiryDate <= oneMonthLater) {
                    alertClass = "expiring-soon";
                } else {
                    return;
                }

                const alertDiv = document.createElement("div");
                alertDiv.classList.add("alert", alertClass);
                alertDiv.textContent = `${item.name} expires in ${daysLeft} day(s) (${item.expiry})`;
                alertsContainer.appendChild(alertDiv);
            });

            if (alertsContainer.innerHTML === "") {
                alertsContainer.innerHTML = "<p>No upcoming expirations within the next 30 days.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching expiry alerts:", error);
            alertsContainer.innerHTML = "<p>Error fetching expiry alerts. Please try again later.</p>";
        });
}
