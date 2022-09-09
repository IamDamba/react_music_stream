const production = "https://music-stream-v2.herokuapp.com";
const development = "http://localhost:5000";

module.exports = {
  base_url: process.env.NODE_ENV ? production : development,
  port: process.env.NODE_ENV ? process.env.PORT : 5000,
};
