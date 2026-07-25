require("dotenv").config()
const app = require('./src/app');
const connectDB = require("./src/db/db")

connectDB();

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('Server is running locally on port ' + PORT);
    });
}

module.exports = app;