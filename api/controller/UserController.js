const app  = require('../app');
const response = require('../common/response');
const Users = require('../model/UserModel');

// Create New Customer
app.post("/users",async(req,res)=> {
    try{

        return res.send("here")
        // // Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', '*');

        // // Request methods you wish to allow
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // // Request headers you wish to allow
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // // Set to true if you need the website to include cookies in the requests sent
        // // to the API (e.g. in case you use sessions)
        // res.setHeader('Access-Control-Allow-Credentials', true);

        return res.send("hello");
        if(Object.keys(req.body).length == 0){
            return response.message(res,400,"ERROR",'no data in body'); //if there is no content in body then this error will generate
        }else{
            const User = new Users(req.body);
            const createUser = await User.save();
            response.message(res,201,"SUCCESS",'user created successfully',createUser); //successfully created new customer
        }
    }catch(e){
        response.error400(e,res);
    }
})

app.get("/users",async(req,res)=> {
    res.send("here");
})

app.post("/userLogin",async(req,res)=>{
    try{

        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        const { username, password } = req.body;
        const user = await Users.findOne({"user_name": username,"password": password}).select("-password");
        if(!user) {
            return response.message(res,400,"ERROR",'Invalid user_name or password'); //if customer not found
        } else {
            return response.message(res,200,"SUCCESS",'user found',user);
        }
    } catch(e) {
        response.error400(e,res);
    }
})