var faker = require('faker');

console.log("Print 10 random product names & prices:");

for(i = 0; i < 10; i++){
    console.log(faker.commerce.product() + ": $" + faker.commerce.price());
}
