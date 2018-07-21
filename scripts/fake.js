const faker = require('faker');
var fs = require('fs');


createUsers();
process.exit();
// Lets start by creating fake users
function createUsers() {
  const arr = []
  for (let index = 0; index < 1000; index++) {
    arr.push(createUser())

  }
  fs.writeFileSync('outfile.json', JSON.stringify(arr));
}

function createUser() {
  return {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    hostname: faker.internet.domainName(),
    port: faker.random.number({min:0, max:5000})
  };
}
