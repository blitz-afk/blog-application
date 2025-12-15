import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// --- ROUTES ---

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.get("/create", (req,res)=>{
    res.render("create.ejs");
})



// --- DATA STORAGE ---
var dB = [];
var lastId = 0;

// --- CREATE POST LOGIC ---
app.post("/create-post",(req,res)=>{
    const Name = req.body["username"];
    const email = req.body["email"];
    const content = req.body["content"];

    const post = {
        postId : ++lastId, 
        AuthorName : Name,
        AuthorEmail : email,
        Content : content,
        Timestamp: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'short' })
    }
    
    dB.unshift(post); // adds the new post at first place;
    
    
    res.redirect("/posts");
})

// --- DELETE POST LOGIC ---
app.post("/delete-post", (req, res) => {
    const idToDelete = parseInt(req.body.deleteId);
    
    dB = dB.filter(post => post.postId !== idToDelete);
    res.redirect("/posts"); 
});

// --- VIEW POSTS LOGIC ---
app.get("/posts", (req,res)=>{
    res.render("view.ejs", {posts: dB});
})

app.listen(port, ()=>{
    console.log(`server running at ${port}`);
})