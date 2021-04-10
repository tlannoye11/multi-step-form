const mongoose = require('mongoose');

try {
    mongoose.connect(
        'mongodb+srv://travisAdmin:123ZLrBD1jzDzLY3@cluster0.xhawq.mongodb.net/MultiStepForm?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        }
    );

    console.log('MongoDB connected');
} catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
}
