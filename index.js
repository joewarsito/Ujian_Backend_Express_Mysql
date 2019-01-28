const express = require("express");
const app = express();
const otentif_route = require("./routes/otentifikasi");

app.use(otentif_route);


app.get("/", (req, res) => {
    res.send({ "Status": "Server telah aktif" });
});

app.listen(4132, () => {
    console.log("Server berjalan pada port 4132");
})
