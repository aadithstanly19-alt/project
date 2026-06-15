const dotenv = require("dotenv");

dotenv.config();

const connectDB =
    require("./config/db");

const Task =
    require("./models/Task");

async function getTasks() {

    await connectDB();

    const tasks =
        await Task.find();

    console.log(tasks);

    process.exit();
}

getTasks();