const fs = require('fs')

const lines = fs.readFileSync('data.txt').toString().split("\n")

const validPasswordCount = lines
	.filter(line => {
		const [policy, password] = line.split(': ')
		const [range, letter] = policy.split(' ')
		const [min, max] = range.split('-')

		const letterCount = password
			.split('')
			.filter(l => l === letter)
			.length
		
		return letterCount >= min && letterCount <= max
	}).length

console.log('validPasswordCount:', validPasswordCount)

const validPasswordCount2 = lines
	.filter(line => {
		const [policy, password] = line.split(': ')
		const [range, letter] = policy.split(' ')
		let [min, max] = range.split('-')
		min--
		max--

		return (password.charAt(min) === letter) !== (password.charAt(max) === letter)
	}).length

console.log('validPasswordCount2:', validPasswordCount2)