const reqEvent = (event) => require(`../Events/${event}`);
module.exports = client => {
    client.on('message', reqEvent('message'));
};