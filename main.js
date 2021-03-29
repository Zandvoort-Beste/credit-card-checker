// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

/*
const validateCred = arr => {
    let j = 0
    let checkNumbers = []
    for (let i = arr.length - 1; i >= 0; i--) {
        if (j === 0) {
            j++
            checkNumbers.unshift(arr[i])
            continue;
        }
        if (j%2 === 1) {
            let doubling = arr[i] * 2
            if (doubling > 9) {
                doubling -= 9
            }
            checkNumbers.unshift(doubling)
            j ++
        } else {
            checkNumbers.unshift(arr[i])
            j ++
        }
        
    } 
    let consolidated = checkNumbers.reduce((acc,cur) => acc + cur)
    return consolidated % 10 === 0
}
*/

// Deze functie controleerd of de creditcard nummers correct zijn
const validateCred = arr => {
    let total = 0
    for (let i = arr.length - 1; i >= 0; i--) {
        let currValue = arr[i]
        if ((arr.length - i - 1)%2 === 1) {
            currValue *= 2;
            if (currValue > 9) {
                currValue -= 9;
            }
        }
        total += currValue;
    }
    return total %10 == 0
}

// Deze functie loopt door de batch array heen om meer te checken
const findIvalidCards = nestArr => {
    let results = []
    for (let i = 0; i < nestArr.length; i++) {
        if (!validateCred(nestArr[i])) {
            results.push(nestArr[i])
        }
        
    }
    return results
}   

// Deze functie geeft een array met alle bedrijven dit slechte nummers hebben
const idInvalidCardCompanies = arr => {
    badCards = findIvalidCards(arr)
    badCompanies = [];
    for (let i = 0; i < badCards.length; i++) { 
        switch (badCards[i][0]) {
            case 3:
                if (badCompanies.indexOf('Amex') === -1) {
                    badCompanies.push('Amex')
                }
                break;
            case 4:
                if (badCompanies.indexOf('Visa') === -1) {
                    badCompanies.push('Visa')
                }
                break;
            case 5:
                if (badCompanies.indexOf('Mastercard') === -1) {
                    badCompanies.push('Mastercard')
                }
                break;
            case 6:
                if (badCompanies.indexOf('Discover') === -1) {
                    badCompanies.push('Discover')
                }
                break;
            default:
                console.log(badCards[i][0] + ' is an invalid Company')
                break;
        }
    }
    return badCompanies
}

// Deze functie geeft de waarde die de kaart verkeerd heeft
const correctCred = arr => {
    let total = 0
    for (let i = arr.length - 1; i >= 0; i--) {
        let currValue = arr[i]
        if ((arr.length - i - 1)%2 === 1) {
            currValue *= 2;
            if (currValue > 9) {
                currValue -= 9;
            }
        }
        total += currValue;
    }
    return total %10
}

// Deze functie neemt een kaart en geeft terug of hij klopt en anders wat hij moet zijn
const cardCorrector = number => {
    for (i = 0; i < number.length; i++) {
        if (validateCred(number[i]) === false) {
            const wrong = number[i]
            difference = correctCred(number[i])
            end = wrong[wrong.length - 1] - difference
            if (end < 0) {
                end += 10
            }
            wrong[wrong.length-1] = end
            console.log( 'Number is corrected to: ' + wrong + ' test to validate is found: ' + validateCred(wrong))
        } else {
            console.log( 'Number is unchanged')
        }
    }
}

// In deze functie kun je zelf een nummer invullen
const numberCorrector = number => {
        if (validateCred(number) === false) {
            const wrong = number
            difference = correctCred(number)
            end = wrong[wrong.length - 1] - difference
            if (end < 0) {
                end += 10
            }
            wrong[wrong.length-1] = end
            console.log( 'Number is corrected to: ' + wrong + ' test to validate is found: ' + validateCred(wrong))
        } else {
            console.log( 'Number is correct')
        }
}

// Deze functie maakt van een string een array
const checkNumber = ccNumber => {
    let array = []
    array = ccNumber.split('')
    array = array.map(Number)
    numberCorrector(array)
}

//console.log(idInvalidCardCompanies(batch))
//checkNumber('38746592843756897')
console.log(findIvalidCards(batch))
