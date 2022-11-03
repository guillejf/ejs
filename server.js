const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/products', (req, res) => {
  console.log('aqui products');
  res.render('pages/products', { title: 'listado de productos', products: productsHC });
});

app.post('/products', (req, res) => {
  const body = req.body;
  //res.json(body);
  let id = 0;
  productsHC.forEach((item) => {
    if (item.id > id) id = item.id;
  });
  body.id = id + 1;
  productsHC.push(body);
  res.render('pages/gracias');
  //res.render('pages/products', { title: 'listado de productos', products: productsHC });
});

app.get('/form', (req, res) => {
  res.render('pages/form', { title: 'ingrese un producto nuevo' });
});
