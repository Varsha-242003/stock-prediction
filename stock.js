#javascript file of stock prediction
#stock.js
let activeEmail = ""
let subscribedStocks = []
let livePrices = {}
let priceTimer = null

function enterDashboard() {
    const email = document.getElementById("emailInput").value.trim()
    if (email === "") {
        alert("Please enter email")
        return
    }
    activeEmail = email
    document.getElementById("activeUser").innerText = "Logged in as " + email
    document.getElementById("loginBox").classList.add("hidden")
    document.getElementById("dashboardBox").classList.remove("hidden")
    startLiveUpdates()
}

function exitDashboard() {
    clearInterval(priceTimer)
    location.reload()
}

function addStock() {
    const stock = document.getElementById("stockPicker").value
    if (stock === "" || subscribedStocks.includes(stock)) return
    subscribedStocks.push(stock)
    if (!livePrices[stock]) {
        livePrices[stock] = (Math.random() * 1000 + 100).toFixed(2)
    }
    drawStocks()
}

function drawStocks() {
    const area = document.getElementById("stockArea")
    area.innerHTML = ""
    subscribedStocks.forEach(stock => {
        const box = document.createElement("div")
        box.className = "stock"
        const name = document.createElement("div")
        name.innerText = stock
        const price = document.createElement("div")
        price.className = "price"
        price.id = "price-" + stock
        price.innerText = livePrices[stock]
        box.appendChild(name)
        box.appendChild(price)
        area.appendChild(box)
    })
}

function startLiveUpdates() {
    priceTimer = setInterval(() => {
        subscribedStocks.forEach(stock => {
            let base = parseFloat(livePrices[stock])
            let change = (Math.random() * 20 - 10)
            let updated = (base + change).toFixed(2)
            livePrices[stock] = updated
            const priceBox = document.getElementById("price-" + stock)
            if (priceBox) {
                priceBox.innerText = updated
            }
        })
    }, 1000)
}
