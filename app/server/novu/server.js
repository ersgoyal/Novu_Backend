const express = require('express');
const { serve } = require("@novu/framework/express");
const { testWorkflow } = require("../../../novu/workflow");
const {sendEmail} = require('../../../novu/sendEmail');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json()); // Required for Novu POST requests

// Serve Novu's workflows at the "/api/novu" endpoint
app.use("/api/novu", serve({ workflows: [testWorkflow] }));

app.post('/api/send-email', (req, res) => {
  sendEmail(req, res);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
