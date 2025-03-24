const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Permitir arquivos estáticos (CSS, JS, etc.)
app.use(express.static("public"));

// Rota principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Conexão dos usuários
io.on("connection", (socket) => {
    console.log("Um usuário entrou no chat!");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg); // Envia a mensagem para todos
    });

    socket.on("disconnect", () => {
        console.log("Usuário saiu do chat.");
    });
});

// A função serverless não precisa de "server.listen" em Vercel
module.exports = (req, res) => {
    server.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });

    return res.send("Servidor em execução");
};
