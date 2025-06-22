import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import routes from './modules/api/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send({success: true, message: 'Iam here with library management'});
});

app.listen(config.port, () => {
    console.log('Server is running');
});

async function server() {
    try {
        // console.log(config)
        await mongoose.connect(config.database_url!);
        console.log('Connected to database');
    } catch (error) {
        console.error(`Server error ${server}`);
    }
}

server();