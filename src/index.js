const app = require('./app');
const config= require('./config');


const server= require('http').createServer(app);

const authRoutes = require('./routes/auth.route');
const protectedRoutes = require ('./routes/protected.route');
const publicRoutes = require('./routes/public.route');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,DELETE,POST,PUT,PATCH');
    res.header('Access-Control-Expose-Headers', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/public', publicRoutes);



server.listen(config.app.port, ()=>{
    console.log(`Server runing on port ${config.app.port}`)
});