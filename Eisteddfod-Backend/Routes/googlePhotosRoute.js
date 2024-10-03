const GooglePhotosAlbum = require('google-photos-album-image-url-fetch');
const constants = require('../constants')
const routes = [];

routes.push({
    method: 'GET',
    path: '/getAllPhotos',
    handler: async (req, reply) => {
        try {
            const url = constants.DRIVE_IMAGE_URL;
            const re = await GooglePhotosAlbum.fetchImageUrls(url);
            if (re != null || re != undefined) {
                let imgs = re.map(img => img.url);
                //console.log(JSON.stringify(imgs[0]));
                return reply.response(imgs);
            }
            else
                return reply.response("Error");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
});

module.exports = routes;