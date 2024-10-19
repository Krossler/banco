// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');

const mongoURI = 'mongodb+srv://krossler:krossler123@react-fullstack.tvrikmx.mongodb.net/?retryWrites=true&w=majority&appName=react-fullstack/colorlistapp';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

const app = express();

app.use(cors({
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3540713694.
    origin: ['https://5173-idx-banco-1729352100404.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev', "http://localhost:5173"],
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    preflightContinue: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'], // URL do frontend
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
