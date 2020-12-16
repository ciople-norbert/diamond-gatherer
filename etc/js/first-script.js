var country = {
    name: 'Iceland',
    population: 356991,
    capital: 'Reykjavik',
    area: 103000,
    currency: 'Icelandic Krona'
};

for (var property in country){
    console.log(`${property}: ${country[property]}`);
};

function hello(name){
    return `Buna, numele meu este ${name}`;
};
