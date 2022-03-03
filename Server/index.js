const http  = require("http");
const query = require('querystring');

const server = http.createServer((request, response)=>{

        var incoming_data = "";
        request.on('data', (chunks)=>{
            incoming_data += chunks.toString();
        });

        request.on('end', ()=>{
            incoming_data = JSON.parse(incoming_data);
            let data = {
                'name' : incoming_data.name,
                'email' : incoming_data.email,
                'mobile' : incoming_data.mobile,
                'address' : incoming_data.address,
                'gender' : incoming_data.gender,
                'password' : incoming_data.password
            }
            
        response.writeHead(200, {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        });
        response.write(JSON.stringify(data));
        response.end(); 
        });
});

server.listen(8080);