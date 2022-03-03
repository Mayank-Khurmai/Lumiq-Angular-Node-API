const http  = require("http");
const mongo = require("mongodb").MongoClient;

const server = http.createServer((request, response)=>{
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
        
        var mongo_url = "mongodb://127.0.0.1:27017";
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

});

server.listen(8080);