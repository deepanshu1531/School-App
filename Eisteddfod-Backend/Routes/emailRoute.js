const Constants = require('../constants');
const Service = require('../Service');
const routes = [];

routes.push({
    method: 'POST',
    path: '/sendEmails',
    handler: async (req, reply) => {
        try {
            let mailObj = {
                to: req.payload.to+"",
                cc: req.payload.cc,
                subject: req.payload.subject,
                text: req.payload.body
            }
            mailObj.cc = mailObj.cc += ","+Constants.GMAIL;
            const Transporter = await Service.getTransporter();
            const str = await Transporter.sendMail(mailObj);
            return reply.response("Success");
        } catch (error) {
            console.log(error);
            return reply.response("Error");
        }
    }
});

module.exports = routes;