const fs = require('fs')

const numbers = fs.readFileSync('data.txt').toString().split("\n")

let result

numbers
	.find(number => {
		const otherNumber = numbers.find(otherNumber => parseInt(number) + parseInt(otherNumber) === 2020)
		if (otherNumber) {
			result = number * otherNumber
			return true
		}
	})
console.log('result:', result)

dance:
for (let number of numbers) {
	for (let number2 of numbers) {
		for (let number3 of numbers) {
			if (parseInt(number) + parseInt(number2) + parseInt(number3) === 2020) {
				console.log('result 2:', number * number2 * number3)
				break dance
			}
		}
	}
}