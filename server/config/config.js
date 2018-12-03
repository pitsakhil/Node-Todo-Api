const env = process.env.NODE_ENV || 'development';

if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if(env ==='development') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';    
}
