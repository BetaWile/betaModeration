const reqEvent = (event) => require(`../Events/${event}`);
module.exports = client => {
    client.on('message', reqEvent('betaMessage'));
    client.on('ready', () => reqEvent('betaReady')(client));
};