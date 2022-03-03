const http  = require("http");

const server = http.createServer((request, response)=>{

            let data = {
                'name' : 'mayank',
                'email' : 'mkk@gmail.com',
                'mobile' : '123',
                'gender' : 'male',
                'password' : 'abc'
            }
        response.writeHead(200, {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        });
        response.write(JSON.stringify(data));
        response.end();
});

server.listen(8080);