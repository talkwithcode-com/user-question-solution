const mongoose = require('mongoose');
const databaseName = 'user-question-solution'

mongoose.connect('mongodb://localhost/' + databaseName, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});
mongoose.set('useCreateIndex', true)

module.exports = db