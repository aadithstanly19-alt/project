const dotenv = require("dotenv");

dotenv.config();

const connectDB =
    require("./config/db");

const Task =
    require("./models/Task");

async function seedTasks() {

    await connectDB();

    await Task.deleteMany();

    await Task.insertMany([

        {
            title: "Learn Node.js",
            description:
                "Study Node fundamentals",
            priority: "high"
        },

        {
            title: "Learn Express",
            description:
                "Build REST APIs",
            priority: "high"
        },

        {
            title: "Learn MongoDB",
            description:
                "Understand collections",
            priority: "medium"
        },

        {
            title: "Complete Assignment",
            description:
                "Submit MongoDB task",
            priority: "high"
        },

        {
            title: "Practice CRUD",
            description:
                "Use Mongoose methods",
            priority: "low"
        }

    ]);

    console.log(
        "5 tasks inserted"
    );

    process.exit();
}

seedTasks();