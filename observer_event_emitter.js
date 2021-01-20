var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

const getFindPattern = () => {
  var emitter = new EventEmitter();

  function findPattern(files, regex) {
    files.forEach(function (file) {
      fs.readFile(file, 'utf8', function (err, content) {
        if (err)
          return emitter.emit('error', err);
        emitter.emit('fileread', file);
        var match = null;
        if (match = content.match(regex))
          match.forEach(function (elem) {
            emitter.emit('found', file, elem);
          });
      });
    });
  }

  emitter.on('fileread', function (file) {
    console.log(file + ' was read');
  })
  .on('found', function (file, match) {
    console.log('Matched "' + match + '" in file ' + file);
  })
  .on('error', function (err) {
    console.log('Error emitted: ' + err.message);
  });

  return findPattern;
}

const findPattern = getFindPattern();

findPattern(
  ['fileA.txt', 'fileB.json'],
  /hello \w+/g
)
