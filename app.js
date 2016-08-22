var request = require('request');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Enter your github username:', (username) => {
    var url = 'https://api.github.com/users/' + username;
    var options = {
            url: url,
              headers: {
                'User-Agent': 'request'
              }
          }

    // GETS user
    request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(response.body), url);
    }
    })


  rl.close();
});
