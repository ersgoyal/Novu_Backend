const { Novu } = require("@novu/node");

const novu = new Novu("2afb2f7a310d2dd0f3ecf17a3170ed47");

const sendEmail = async (req, res) => {   
    const { email, userName, subject, body } = req.body;

    const recipients = email.map(email => ({
      subscriberId: email,
      email: email, 
    }));

    console.log(recipients);
    

    try {
        await novu.trigger('test-workflow', {
            to: recipients,
            payload: {
              userName: userName,
              subject:subject,
              body:body
            },
          });
          res.status(200).json({ message: 'Email sent successfully' });

    
        
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });

        
      }
};

module.exports = { sendEmail };
