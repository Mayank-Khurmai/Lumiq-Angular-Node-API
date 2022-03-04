const http  = require("http");
const mongo = require("mongodb").MongoClient;
const mongo_url = "mongodb://127.0.0.1:27017";

const server = http.createServer((request, response)=>{

    if(request.url == "/")
    {
            // Receiving Data
            var incoming_data = "";
            request.on('data', (chunks)=>{
                incoming_data += chunks.toString();
            });

            request.on('end', ()=>{
                incoming_data = JSON.parse(incoming_data);
                let receivedData = {
                    'name' : incoming_data.name,
                    'email' : incoming_data.email,
                    'mobile' : incoming_data.mobile,
                    'address' : incoming_data.address,
                    'gender' : incoming_data.gender,
                    'password' : incoming_data.password
                }

                
            // Connection with MongoDB
            
            mongo.connect(mongo_url, (error, conn)=>{

                const db = conn.db("api_db");
                db.createCollection("loginDetails", (error, conn)=>{

                    let dataCheck = {
                        'email': receivedData.email
                    };
                    db.collection("loginDetails").find(dataCheck).toArray((error, data)=>{
                        if(data.length != 0){
                            response.writeHead(409, {
                                'Content-type' : 'application/json',
                                'Access-Control-Allow-Origin' : '*'
                            });
                            let outputMsg = {
                                message: "Already Exists"
                            };
                            response.write(JSON.stringify(outputMsg));
                            response.end(); 
                        }
                        else{
                            db.collection("loginDetails").insertOne(receivedData, (error, conn)=>{
                                response.writeHead(200, {
                                    'Content-type' : 'application/json',
                                    'Access-Control-Allow-Origin' : '*'
                                });
                                let outputMsg = {
                                    message: "Inserted"
                                };
                                response.write(JSON.stringify(outputMsg));
                                response.end(); 
                            });
                        }
                    });

                });

            });
                    
        });

    }   
    
    else if(request.url == "/login")
    {
            // Receiving Data
            var incoming_data = "";
            request.on('data', (chunks)=>{
                incoming_data += chunks.toString();
            });

            request.on('end', ()=>{
                incoming_data = JSON.parse(incoming_data);
                incoming_data = JSON.parse(incoming_data.body);
                var receivedData = {
                    'email' : incoming_data.email,
                    'password' : incoming_data.password
                }

                mongo.connect(mongo_url, (error, conn)=>{
                    const db = conn.db("api_db");
                    db.collection("loginDetails").find(receivedData).count((error, length)=>{
                        if(length != 0){
                            db.collection("loginDetails").find(receivedData, {projection:{_id:1}}).toArray((error, data)=>{
                                response.writeHead(200, {
                                    'Content-type' : 'application/json',
                                    'Access-Control-Allow-Origin' : '*'
                                });
                                let outputMsg = {
                                    message: data
                                };
                                response.write(JSON.stringify(outputMsg));
                                response.end(); 
                            });
                        }
                        else{
                            response.writeHead(401, {
                                'Content-type' : 'application/json',
                                'Access-Control-Allow-Origin' : '*'
                            });
                            let outputMsg = {
                                message: "Login Failed"
                            };
                            response.write(JSON.stringify(outputMsg));
                            response.end(); 
                        }
                    });
                });
            });
    }

    else
    {
        console.log("Else");
        response.end();
    }

});

server.listen(8080);