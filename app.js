const express = require('express');

const app = express();
const { Router } = express;
const router = new Router();


app.use("/api/productos", router);
app.use("/static", express.static(__dirname + "/public"));
app.use((req, res, next) => {
    res.sendStatus(404).send("Página no encontrada");
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const data = [];

router.get("/", (req, res) => {
    res.json(data);
});

router.get("/:id", (req, res) => {
    const objeto = data.find((product) => product.id == req.params.id) ?? {
        error: "producto no encontrado",
    };
    res.json(objeto);
});

router.post("/", (req, res) => {
    try {
        req.body.id = data[data.length - 1].id + 1;
    } catch {
        req.body.id = 1;
    }
    data.push(req.body);
    res.json(req.body);
});

router.put("/:id", (req, res) => {
    const indice = data.findIndex((product) => product.id == req.params.id);

    if (indice != -1) {
        req.body.id = parseInt(req.params.id);
        data[indice] = req.body;
        res.json(req.body);
    } else {
        res.json({ error: "producto no encontrado" });
    }
});

router.delete("/:id", (req, res) => {
    const indice = data.findIndex((product) => product.id == req.params.id);

    if (indice != -1) {
        data.splice(indice, 1);
        res.json(data);
    } else {
        res.json({ error: "producto no encontrado" });
    }
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`http://localhost:8080`);
});

server.on("error", (error) => console.log(`${error}`));