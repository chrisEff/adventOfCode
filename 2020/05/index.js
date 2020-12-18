const fs = require('fs')

const data = fs.readFileSync('data.txt').toString()

const binaryTreeToNumber = (pattern, lowerRangeLetter) => {
	let min = 0
	let max = Math.pow(2, pattern.length) - 1

	pattern.split('').forEach(letter => {
		if (letter === lowerRangeLetter) {
			max -= Math.ceil((max-min)/2)
		} else {
			min += Math.ceil((max-min)/2)
		}
	})
	
	return min
}

const seatIds = data
	.split("\n")
	.map(seat => {
		const rowNum = binaryTreeToNumber(seat.substr(0, 7), 'F')
		const colNum = binaryTreeToNumber(seat.substr(7, 3), 'L')

		return rowNum * 8 + colNum;
	})
	.sort((a, b) => a - b)

const maxSeatId = seatIds.pop()
seatIds.shift()

let previous = 0;

const mySeatId = seatIds.find(seatId => {
	if (previous === 0 || (seatId - previous) === 1) {
		previous = seatId
		return false
	}
	return true
}) - 1

console.log('maxSeatId:', maxSeatId)
console.log('mySeatId:', mySeatId)

/*
# # # # # # # # # # # # # # # #		0-15
# # # # # # # #						0-7
ceil((7-0)/2)=4
        # # # #						4-7
            # #                     5-7
 */
