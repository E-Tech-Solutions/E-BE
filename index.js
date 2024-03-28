const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 2500;
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["POST", "DELETE", "PUT", "GET"]
}));

app.use('/api', require('./API/USER/router'));
app.use('/api', require('./API/TaskFile/router'))
app.use('/api', require('./API/CustomerFile/router'))
app.use('/api', require('./API/LeadFile/router'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})