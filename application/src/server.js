const express = require("express")
const path = require("path")
const routes = require("./routes/index")

const app = express()
const port = 80

for (const [key, value] of Object.entries({
    "x-powered-by": false
})) app.set(key, value);

app.use("/", routes())

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`)
})