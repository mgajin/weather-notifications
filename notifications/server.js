const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
    if (error) {
        throw error;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        let queue = 'node_queue';
        let msg = 'Test message';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
        console.log(`Sent ${msg}`);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
