const server = require("./server")

const PORT = process.env.port || 8000;

server.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})

