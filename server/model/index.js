const { mongoose, Schema, model } = require("mongoose");

const blogDB = process.env.MONGODB_URL
const albumDB = process.env.MONGODB_URL2 || process.env.MONGODB_URL
const dbName = "echo"
const blog = mongoose.createConnection(blogDB,{dbName})
const album = mongoose.createConnection(albumDB,{dbName})


// 取消mongoose的版本号记录
const option = { versionKey: false, virtuals: true }

const User = blog.model("user", new Schema({
  name: String,
  pw: String,
  group: String,
  mail: String,
  smtp_url: String,
  smtp_port: Number,
  smtp_pw: String
}, option));


const Moment = blog.model("moment", new Schema({
  date: Number,
  tag: String,
  body:String
}, option));


const Album = album.model("album", new Schema({
  name:String,
  album:String,
  desc:String,
  img_data:String,
},option))

module.exports = {
  User,Moment,Album
}