const express = require("express");
const app = express();
const keyRoutes = require("../src/routes/key.routes");
const db = require("./config/db");
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/keys", keyRoutes);

app.get("/test", (req, res) => {
    res.send("Server is reachable!");
});


app.listen(PORT, '0.0.0.0', () => {
 console.log(`Server is running on port ${PORT}`);
});
