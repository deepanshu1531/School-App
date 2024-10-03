const UseTube = require('usetube');
const Constants = require('../constants');
const routes = [];

routes.push({
    method: 'GET',
    path: '/getAllVideos',
    handler: async (req, reply) => {
        try {
            channelId = Constants.YOUTUBE_CHANNEL_ID;
            const Videos = await UseTube.getChannelVideos(channelId);
            if (Videos != null){
                return reply.response(Videos);
            }else{
                return reply.response("Error");
            }
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
});

module.exports = routes;