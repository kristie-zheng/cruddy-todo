const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId();
  //items[id] = text;
  //callback(null, {id: id, text: text});
  fs.writeFile(`./dataDir/${id}`, text, function(err) {
    if (err) { 
      callback(err); 
    } else {
      console.log('The file has been saved with the id of ' + id);
      callback(null, {id, text}); //Which callback is being applied here; it seems to be addTodo which only takes one arg
    }
  });
};

exports.readOne = (id, callback) => {
  // var item = items[id];
  var item = data[data.indexOf(id)];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, {id: id, text: item});
  }
};

exports.readAll = (callback) => {
  var data = [];
  // _.each(items, (item, idx) => {
  //   data.push({ id: idx, text: items[idx] });
  // });f
  console.log('executes here');
  fs.readdir('./dataDir/', function(err, files) {
    if (err) { 
      throw error; 
    } else {
      data = files.slice();
      console.log('here is data array', JSON.stringify(data));
    }
  });
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, {id: id, text: text});
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
