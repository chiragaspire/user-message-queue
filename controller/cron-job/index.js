const cron = require('node-cron');
const { retrieveMessages } = require('../../queueServices/queue');

const jobScheduler = () => {
    console.log('schedular started!!!')
    /* Run cron job which retrieves 
    the status pending tasks and move 
    to task queue on every 15 minutes
    */
    cron.schedule('*/15 * * * *', () => {
        console.log('called')
        retrieveMessages()
    });
};

module.exports = { jobScheduler };
