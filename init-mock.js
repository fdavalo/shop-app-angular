const request = require('request');

var users = [
    {
        "id": "admin@gmail.com",
        "password": "admin123",
        "admin": true
    },  
    {
        "id": "user1@gmail.com",
        "password": "hello1",
        "addresses": [
          {
            "city": "Paris",
            "street": "3, rue de Londres",
            "postalCode": "75010",
            "country": "France"
          }
        ]
    },
    {
        "id": "user2@gmail.com",
        "password": "hello2",
        "addresses": [
          {
            "city": "Nantes",
            "street": "2, avenue de la Liberté",
            "postalCode": "44000",
            "country": "France"
          }
        ]
    }
];  

for (var ind in users) {
    var user = users[ind];
    request.post('http://localhost:3000/users', {json: user}, (error, res, body) => {
        if (error) console.log(error);
        else console.log(res.body);
    });
}