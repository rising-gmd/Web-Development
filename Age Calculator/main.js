// Date Month and Year
const date = document.querySelector(".date")
const month = document.querySelector(".month")
const year = document.querySelector(".year")
const inputs = document.querySelectorAll("input")

// Date Month and Year Errors
const dateError = document.querySelector(".dateError")
const monthError = document.querySelector(".monthError")
const yearError = document.querySelector(".yearError")

// Show Stats
const showDay = document.querySelector(".showDay")
const showMonth = document.querySelector(".showMonth")
const showYear = document.querySelector(".showYear")

// Show Errors of Label
const dateLabelError = document.querySelector(".dateLabelError")
const monthLabelError = document.querySelector(".monthLabelError")
const yearLabelError = document.querySelector(".yearLabelError")

//Calculate Age
const calculate = document.querySelector("#calculate")

function setError(element, errorElement, labelElement) {
    element.classList.add("error")
    errorElement.style.display = "block"
    labelElement.style.color = "red"
}

function setAllInputErrors() {
    setError(date, dateError, dateLabelError)
    setError(month, monthError, monthLabelError)
    setError(year, yearError, yearLabelError)
}

function removeError(element, errorElement, labelElement) {
    element.classList.remove("error")
    errorElement.style.display = "none"
    labelElement.style.color = "hsl(0, 1%, 44%)"
}

function checkInputEmpty(element, errorElement, labelElement) {
    isNaN(parseInt(element.value)) === true ? setError(element, errorElement, labelElement) : removeError(element, errorElement, labelElement)
}

function checkErrors() {
    return Array.from(inputs).some((input) => input.className.includes("error"))
}

function dateInRange(date, dateError) {
    const day = parseInt(date.value)
    if (day < 1 || day > 31) {
        setError(date, dateError, dateLabelError)
    }
}

function monthInRange(month, monthError) {
    const mon = parseInt(month.value)
    if (mon < 1 || mon > 12) {
        setError(month, monthError, monthLabelError)
    }
}

function isAfter(date1, date2) {
    return date1 > date2;
}

function isValidDate() {
    const d = new Date(+year.value, (+month.value) - 1, +date.value)
    return (d.getFullYear() === +year.value && d.getMonth() === (+month.value) - 1 && d.getDate() === +date.value)
}

function getAgeDifference() {

    const dateOfBirth = new Date(+year.value, (+month.value) - 1, +date.value)
    const todayDate = new Date()

    const startYear = dateOfBirth.getFullYear()
    const startMonth = dateOfBirth.getMonth()
    const startDay = dateOfBirth.getDate()
    const endYear = todayDate.getFullYear()
    const endMonth = todayDate.getMonth()
    const endDay = todayDate.getDate()

    let yearDiff = endYear - startYear
    let monthDiff = endMonth - startMonth
    let dayDiff = endDay - startDay

    if (dayDiff < 0) {
        const lastDayOfMonth = new Date(endYear, endMonth, 0).getDate()
        dayDiff = lastDayOfMonth - startDay + endDay
        monthDiff--
    }

    if (monthDiff < 0) {
        monthDiff += 12
        yearDiff--
    }

    return { years: yearDiff, months: monthDiff, days: dayDiff }

}

function showCount(num, element) {

    let step = 50

    switch (true) {
        case num > 200:
            step = 1
            break
        case num > 100:
            step = 10
            break
        case num > 75:
            step = 20
            break
        case num > 50:
            step = 25
            break
        case num > 25:
            step = 35
            break
        default:
            break
    }

    if (num === 0) {
        element.innerText = num

    } else {
        let count = 0
        let interval = setInterval(() => {
            count++
            if (count === num) {
                clearInterval(interval)
                date.value = ""
                month.value = ""
                year.value = ""
            }
            element.classList.add("showCount")
            element.innerHTML = count
        }, step)
    }

}

function showUserAge() {

    const { years, months, days } = getAgeDifference()
    
    showCount(days, showDay)
    showCount(months, showMonth)
    showCount(years, showYear)
}

calculate.addEventListener("click", (e) => {

    checkInputEmpty(date, dateError, dateLabelError)
    checkInputEmpty(month, monthError, monthLabelError)
    checkInputEmpty(year, yearError, yearLabelError)

    const emptyErrors = checkErrors()
    if (!emptyErrors) {

        dateInRange(date, dateError)
        monthInRange(month, monthError)
        const rangeErrors = checkErrors()

        if (!rangeErrors) {

            const todayDate = new Date()
            const d = new Date(+year.value, (+month.value) - 1, +date.value)
            const IsDateinFuture = isAfter(d, todayDate)

            if (IsDateinFuture) { setAllInputErrors() }
            const futureDateErros = checkErrors()

            if (!futureDateErros) {

                const validDate = isValidDate()
                validDate === true ? showUserAge() : setAllInputErrors()

            }

        }

    }

})

