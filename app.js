/**
 * Require Dependecies
 */
const request = require('request');
const readline = require('readline');
const apiToken = process.env.API_TOKEN;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Request's user input
 */
rl.question('Enter your github username: ', (username) => {
    const url = 'https://api.github.com/users/' + username + "/repos";
    const options = {
            url: url,
              headers: {
                'User-Agent': 'request'
              }
          }
    /**
     * GETs user's repositories
     */
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(response.body)[1])
        }

        // Runs after response body exists
        if(response.body){
            /**
             * Request's user input
             */
            rl.question('create a gist content: ', (gistContent) => {
                const url = 'https://api.github.com/gists/';
                const options = {
                        url: url,
                          headers: {
                            'User-Agent': 'request',
                            'Authorization': 'token ' + apiToken
                        },
                        form: JSON.stringify({
                            "description":"Gist Created via API",
                            public: true,
                            files: {
                                "file_content.txt":{
                                    content:gistContent
                                    }
                                }
                            })
                        }

                /**
                 * POSTS a gist
                 */
                request.post(options, (error, response, body) => {
                    if (!error) {
                      console.log('post request sent');
                      console.log(response.body);
                  }else {
                      console.log(error);
                  }
                })
                rl.close();
            });
        }
    })


})
