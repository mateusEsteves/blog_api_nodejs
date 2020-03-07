'use strict';

module.exports = {
    AuthStrategy: require('./auth.strategy'),
    ...require('./auth.middleware'),
    ...require('./user.serializer')
}