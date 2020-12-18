const passports =
	require('fs')
	.readFileSync('data.txt')
	.toString()
	.split("\n\n")
	.map(passport => passport
		.replaceAll(' ', "\n")
		.replaceAll("\n", "\",\n\"")
		.replaceAll(':', '":"')
	)
	.map(passport => JSON.parse(`{"${passport}"}`))

console.log(
	'validPassportCount:',
	passports
		.filter(p => p.byr)
		.filter(p => p.iyr)
		.filter(p => p.eyr)
		.filter(p => p.hgt)
		.filter(p => p.hcl)
		.filter(p => p.ecl)
		.filter(p => p.pid)
		.length
)

console.log(
	'validPassportCount2:',
	passports
		.filter(p => p.hgt && p.ecl && p.hcl && p.pid)
		.map(passport => ({
			...passport,
			hgtValue: passport.hgt.slice(0, -2),
			hgtUnit: passport.hgt.slice(-2)
		}))
		.filter(p => (
				parseInt(p.byr) >= 1920 && parseInt(p.byr) <= 2002 &&
				parseInt(p.iyr) >= 2010 && parseInt(p.iyr) <= 2020 &&
				parseInt(p.eyr) >= 2020 && parseInt(p.eyr) <= 2030 &&
				(
					(p.hgtUnit === 'cm' && p.hgtValue >= 150 && p.hgtValue <= 193) ||
					(p.hgtUnit === 'in' && p.hgtValue >= 59 && p.hgtValue <= 76)
				) &&
				p.hcl.match(/^#[a-f0-9]{6}$/g) &&
				p.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g) &&
				p.pid.match(/^[0-9]{9}$/g)
		))
		.length
)