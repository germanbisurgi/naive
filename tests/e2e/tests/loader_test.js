var assert = require('assert');
var cache = 0;
var got = '';
var queue = 0;
var success = 0;
var errors = 0;
var queueContainer = '';

Feature('Loader');

Scenario('Should add and load Audio successfully', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-audio');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"tic","url":"../assets/audio/tic.mp3","type":"audio"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 1);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 1);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
});

Scenario('Should add and load Audio wrongly', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-incorrect-audio');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"tic","url":"../incorrect/path/to/tic.mp3","type":"audio"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 1);
});

Scenario('Should add and load AudioBuffer successfully', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-audio-buffer');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"tic","url":"../assets/audio/tic.mp3","type":"audio-buffer"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 1);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 1);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
});

Scenario('Should add and load AudioBuffer wrongly', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-incorrect-audio-buffer');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"tic","url":"../incorrect/path/to/tic.mp3","type":"audio-buffer"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 1);
});

Scenario('Should add and load an Image successfully', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-image');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"brick","url":"../assets/images/brick.png","type":"image"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 1);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 1);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
});

Scenario('Should add and load an Image wrongly', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-incorrect-image');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"brick","url":"../incorrect/path/to/brick.png","type":"image"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 1);
});

Scenario('Should add and load JSON successfully', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-json');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"test","url":"../assets/json/test.json","type":"json"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 1);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 1);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
});

Scenario('Should add and load JSON wrongly', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-incorrect-json');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 1);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"test","url":"../incorrect/path/to/test.json","type":"json"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 1);
});

Scenario('Should add and load audio, images and JSON both wrongly and successfully', async function (I) {
  I.amOnPage('loader.html');
  I.waitForText('DOM READY');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 0);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 0);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 0);
  I.click('.add-audio');
  I.click('.add-audio-buffer');
  I.click('.add-image');
  I.click('.add-json');
  I.click('.add-incorrect-audio');
  I.click('.add-incorrect-audio-buffer');
  I.click('.add-incorrect-image');
  I.click('.add-incorrect-json');
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 8);
  queueContainer = await I.grabTextFrom('.queue-items');
  assert.equal(queueContainer, '[{"name":"tic","url":"../assets/audio/tic.mp3","type":"audio"},{"name":"tic","url":"../assets/audio/tic.mp3","type":"audio-buffer"},{"name":"brick","url":"../assets/images/brick.png","type":"image"},{"name":"test","url":"../assets/json/test.json","type":"json"},{"name":"tic","url":"../incorrect/path/to/tic.mp3","type":"audio"},{"name":"tic","url":"../incorrect/path/to/tic.mp3","type":"audio-buffer"},{"name":"brick","url":"../incorrect/path/to/brick.png","type":"image"},{"name":"test","url":"../incorrect/path/to/test.json","type":"json"}]');
  I.click('.start');
  I.waitForText('yes', 3, '.complete');
  cache = await I.grabTextFrom('.cache');
  assert.equal(cache, 4);
  queue = await I.grabTextFrom('.queue');
  assert.equal(queue, 0);
  success = await I.grabTextFrom('.success');
  assert.equal(success, 4);
  errors = await I.grabTextFrom('.errors');
  assert.equal(errors, 4);
  I.click('.get');
  got = await I.grabTextFrom('.got');
  assert.equal(got, 'tic');
});
