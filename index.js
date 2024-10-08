import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
var port = 3000;
// checking
var isAuthorized = false;
app.use(bodyParser.urlencoded({extended : true}));
function passwordCheck(req,res,next){
    const password = req.body["password"];
    if(password === "ILoveProgramming"){
        isAuthorized = true;
    }
    next();
}
app.use(passwordCheck);
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.post("/submit",(req,res)=>{
    if(isAuthorized){
        res.sendFile(__dirname+"/secret.html");
    }
    else{
        res.sendFile(__dirname+"/index.html");
    }
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})
