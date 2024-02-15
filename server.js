import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
env.config();

const app = express();
const port = 4000;
app.use(express.static("public"));


const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'secrets',
    password: process.env.L_DB_PASSWORD,
    port: '5432',
});

db.connect();
// const { rows } = db.query('select * from test1');
// console.log(rows[0].name);

app.get('/admin', async (req, res) => {
    const { rows } = await db.query('select * from test1');
    const data = rows[0].name;
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
})

// (async ()=> {
//     try{
//         const { rows } = await db.query('select * from test1');
//         console.log(rows);
//     }catch(err){
//     console.error(err);
//     }
    
// })


// const pool = new Pool({
//     connectionString: process.env.DB_URL + "?sslmode=require",
// });

// let client;

// (async () => {
//     try {
//         client = await pool.connect();
//         // const resp = client.query('create table test1 (name varchar(40) , age varchar(45))');
//         // console.log(resp);
//     } catch (err) {
//         console.error(err);
//     }

// })
// console.log(client);

// pool.connect((err) => {
//     if (err) throw err
//     console.log("Connect to PostgreSQL successfully!")
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post("/msg", async (req, res) => {
    // console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.send("Server Post Success !!");
    const checkResult = await db.query("SELECT * FROM users WHERE id = 1");
    console.log(checkResult.rows);
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});





// // Route to render the main page
// app.get("/", async (req, res) => {
//     try {
//         const response = await axios.get(`${API_URL}/posts`);
//         console.log(response);
//         res.render("index.ejs", { posts: response.data });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching posts" });
//     }
// });

// // Route to render the edit page
// app.get("/new", (req, res) => {
//     res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
// });

// app.get("/edit/:id", async (req, res) => {
//     try {
//         const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
//         console.log(response.data);
//         res.render("modify.ejs", {
//             heading: "Edit Post",
//             submit: "Update Post",
//             post: response.data,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching post" });
//     }
// });

// // Create a new post
// app.post("/api/posts", async (req, res) => {
//     try {
//         const response = await axios.post(`${API_URL}/posts`, req.body);
//         console.log(response.data);
//         res.redirect("/");
//     } catch (error) {
//         res.status(500).json({ message: "Error creating post" });
//     }
// });

// // Partially update a post
// app.post("/api/posts/:id", async (req, res) => {
//     console.log("called");
//     try {
//         const response = await axios.patch(
//             `${API_URL}/posts/${req.params.id}`,
//             req.body
//         );
//         console.log(response.data);
//         res.redirect("/");
//     } catch (error) {
//         res.status(500).json({ message: "Error updating post" });
//     }
// });

// // Delete a post
// app.get("/api/posts/delete/:id", async (req, res) => {
//     try {
//         await axios.delete(`${API_URL}/posts/${req.params.id}`);
//         res.redirect("/");
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting post" });
//     }
// });


