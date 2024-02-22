const amqp = require("amqplib");
// const { updateTask } = require("./controller/users");
const { getUserTasksByQuery, updateTasksByQueue } = require("../controller/users");

const USER_TASK_QUEUE = "user_task_queue";

/* Connection for the rabbit queue */
const connect = async () => {
    const connection = await amqp.connect(process.env.RABBIT_QUE_HOST);
    const channel = await connection.createChannel();
    await channel.assertQueue(USER_TASK_QUEUE, { durable: false });
    return { connection, channel }
}
let queChannel;

/* Retrieve the Pending tasks and send to message queue  */
const retrieveMessages = async () => {
    const queuedTasks = await getUserTasksByQuery({status: 'in-progress'});
    const taskIds = queuedTasks.map((task) => task.id);
    taskIds.length && taskIds.forEach((taskId) => {
        queChannel && queChannel.sendToQueue(USER_TASK_QUEUE, Buffer.from(JSON.stringify({ _id: taskId })));
    })
}

/* Consume the Queue events */
const consumerQueue = async () => {
    await queChannel.consume(
        USER_TASK_QUEUE,
        async (message) => {
            if (message) {
                const task = message.content.toString()
                await updateTasksByQueue(JSON.parse(task));
            }
        },
        { noAck: true }
    );
}


connect().then(async ({ connection, channel }) => {
    queChannel = channel

    await consumerQueue()

    /* Close the connection */
    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
    });
});

module.exports = {
    consumerQueue,
    retrieveMessages
}