const data = require('fs')
	.readFileSync('data.txt')
	.toString()
	.split("\n")
	.map(line => line.split(''))

// console.log(data)

const slopes = [
	{ right: 1, down: 1 },
	{ right: 3, down: 1 },
	{ right: 5, down: 1 },
	{ right: 7, down: 1 },
	{ right: 1, down: 2 },
].map(slope => {
	let x = 0
	const trees = data
		.filter((line, i) => i % slope.down === 0)
		.filter(line => {
			const result = line[x] === '#'
			x += slope.right
			if (x >= line.length) {
				x -= line.length
			}
			return result
		}).length
	
	return { ...slope, trees}
})

console.log('slopes:', slopes)

const result = slopes
	.map(slope => slope.trees)
	.reduce((total, trees) => total * trees)

console.log('result:', result)