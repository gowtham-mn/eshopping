const mongoose = require('mongoose');
const uri = 'mongodb+srv://firstapp:mugiwara@cluster0.ogmx6jh.mongodb.net/FirstMern?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
const dbrun = async () => {
    await mongoose.connect(uri, async (err, res) => {
        console.log("db up");
        const data = await mongoose.connection.db.collection("datas");
        data.find({}).toArray(async function (err, data) {
            const catogory = await mongoose.connection.db.collection("catogory");
            catogory.find({}).toArray(function (err, catoData) {
                if (err) console.log(err);
                else {
                    global.food_items = data;
                    global.food_catogory = catoData;
                }
            })

        })
    });
}

module.exports = dbrun;