// import { createHash } from 'crypto';
// import * as buffer from "buffer";
// window.Buffer = buffer.Buffer;
var crypto = require('crypto');
const BufferType = require('buffer').Buffer;
// console.log(crypto);

// var crypto = require('crypto');
exports.encrypt = function (plainText, workingKey) {
	var m = crypto.createHash('md5');
    	m.update(workingKey);
   	var key = m.digest();
	// const keyy = crypto.randomBytes(16);
	console.log("key length "+key);
	console.log("parameter "+plainText);
      	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
		//   var iv = crypto.randomBytes(16);
	var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	// const buffers = Buffer.from(plainText, 'base64');
	// const bufferr = new ArrayBuffer(8);
	// bufferr[0] = buffers;
	// const uint8Array = new Uint8Array(buffers);
	
	var encoded = cipher.update(plainText,'utf8','hex');
	encoded += cipher.final('hex');
    	return encoded;
};
// exports.encrypt = function (plainText, workingKey) {
// 	console.log("text "+plainText+" key "+workingKey);
// 	var m = createHash('md5',workingKey);
// 	m.update(plainText);
// 	var key = m.digest();
// 	// var m = createHash('md5');
// 	// m.update(workingKey);
// 	// var key = m.digest();
// 	console.log("key value  " + key);
// 	// console.log("key value pair  "+m);
// 	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
// 	var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
// 	console.log("encoded  " + cipher);

// 	const bufferr = Buffer.from(plainText, 'utf-8').toString('hex');
// 	// uint8Array[0] = plainText;
// 	// buffer = plainText;
// 	console.log("uint8Array" + bufferr);
// 	const buffers = new ArrayBuffer(8);
// 	const uint8Array = new Uint8Array(bufferr);
// 	// uint8Array[0]= bufferr;
// 	// console.log("encoded  form " + uint8Array);

// 	const bufferArray = textToHex(plainText);
// 	var encoded = cipher.update(bufferr, 'hex', 'utf8');
// 	// const encoded = Buffer.from(plainText, 'utf8').toString('hex');
// 	// var encoded = cipher.update(plainText, 'utf8').toString('hex');
// 	console.log("encoded  form " + encoded);
// 	encoded += cipher.final('hex');

// 	// const checksum = crypto
//   	// .createHmac('md5', workingKey)
//   	// .update(plainText)
//   	// .digest('hex');
// 	//   console.log("checksum " + checksum);
// 		return encoded;
// };



exports.decrypt = function (encText, workingKey) {
	var m = crypto.createHash('md5');
	m.update(workingKey)
	var key = m.digest('binary');
var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
	var decoded = decipher.update(encText,'hex','utf8');
decoded += decipher.final('utf8');
	return decoded;
};


// exports.decrypt = function (encText, workingKey) {
// 	var m = createHash('md5');
// 	m.update(workingKey)
// 	var key = m.digest();
// 	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
// 	var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
// 	// var decoded = decipher.update(encText, 'hex', 'utf8');
// 	const decoded = Buffer.from(encText, 'utf8').toString('hex');
// 	// decoded += decipher.final('utf8');
// 	return decoded;
// };






