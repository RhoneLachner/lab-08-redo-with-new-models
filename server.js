const app = require('./lib/utils/app.js');


const PORT = process.env.PORT || 7654;

app.listen(PORT, () => {
  console.log(`Listening on pont ${PORT}`);
});
