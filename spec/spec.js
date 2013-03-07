var utils = require('../utils')
  , assert = require('assert')
  , should = require('should')
  ;

describe('stringKBytes', function() {
  it('should return 1K when given 1024', function() { assert.equal(utils.stringKBytes(1024), '1K'); })
  it('should return 1K when given 1535', function() { assert.equal(utils.stringKBytes(1535), '1K'); })
  it('should return 2K when given 1536', function() { assert.equal(utils.stringKBytes(1536), '2K'); })
})

describe('sameDay', function() {
  it('is true if the dates are the same',       function() { assert(utils.sameDay(new Date(79,5,24), new Date(79,5,24))); })
  it('is false if the days are not the same',   function() { assert( ! utils.sameDay(new Date(79,5,24), new Date(79,5,25))); })
  it('is false if the months are not the same', function() { assert( ! utils.sameDay(new Date(79,5,24), new Date(79,6,24))); })
  it('is false if the years are not the same',  function() { assert( ! utils.sameDay(new Date(79,5,24), new Date(80,5,25))); })
})

describe('dayOfWeekToString', function() {
  it('is Sunday on day 0',    function() { assert.equal(utils.dayOfWeekToString(0), 'Sunday') })
  it('is Monday on day 1',    function() { assert.equal(utils.dayOfWeekToString(1), 'Monday') })
  it('is Tuesday on day 2',   function() { assert.equal(utils.dayOfWeekToString(2), 'Tuesday') })
  it('is Wednesday on day 3', function() { assert.equal(utils.dayOfWeekToString(3), 'Wednesday') })
  it('is Thursday on day 4',  function() { assert.equal(utils.dayOfWeekToString(4), 'Thursday') })
  it('is Friday on day 5',    function() { assert.equal(utils.dayOfWeekToString(5), 'Friday') })
  it('is Saturday on day 6',  function() { assert.equal(utils.dayOfWeekToString(6), 'Saturday') })
})

describe('timeString', function() {
  it('shows AM with no seconds', function() { assert.equal(utils.timeString(new Date('July 21, 1983 01:15:01'), false), '1:15AM') })
  it('shows PM with no seconds', function() { assert.equal(utils.timeString(new Date('July 21, 1983 13:15:02'), false), '1:15PM') })
  it('shows AM with seconds',    function() { assert.equal(utils.timeString(new Date('July 21, 1983 11:15:03'), true), '11:15:03AM') })
  it('shows PM with seconds',    function() { assert.equal(utils.timeString(new Date('July 21, 1983 23:15:04'), true), '11:15:04PM') })
})

describe('viewDate', function() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate(); // date of month
  var oneAmToday = new Date(year, month, day, 1, 0, 0, 0)
  var oneAmSunday = new Date(year, month, day - now.getDay(), 1, 0, 0, 0)
  var lastMonth = new Date(((month == 0) ? (year - 1) : year), 
                           ((month == 0) ? 11 : (month - 1)), 
                           day, 1, 0, 0, 0)
  it('returns timeString(when, false) when it is the same date', function() {
    assert.equal(utils.viewDate(oneAmToday, true), utils.timeString(oneAmToday, false))
    assert.equal(utils.viewDate(oneAmToday, false), utils.timeString(oneAmToday, false))
  })
  it('returns day when it is the same week', function() {
    if (now.getDay() == 0) {
      // skip this test on Sundays
    } else {
      assert.equal(utils.viewDate(oneAmSunday, true), 'Su')
      assert.equal(utils.viewDate(oneAmSunday, false), 'Sunday')
    }
  })
  it('returns date when it is more than a week ago', function() {
    assert.equal(utils.viewDate(lastMonth, true), lastMonth.toLocaleDateString())
    assert.equal(utils.viewDate(lastMonth, false), lastMonth.toLocaleDateString())
  })
})

describe('iaAlpha', function() {
  var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  var nonAlpha = ' !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~'.split('')
  it('is true for letters', function() { alpha.forEach(function(c) { assert(utils.isAlpha(c)) }) })
  it('is false for non-letters', function() { nonAlpha.forEach(function(c) { assert( ! utils.isAlpha(c)) }) })
})

describe('isNumeric', function() {
  var numbers = '0123456789'.split('')
  var nonNumbers = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  it('is true for letters', function() { numbers.forEach(function(c) { assert(utils.isNumeric(c)) }) })
  it('is false for non-letters', function() { nonNumbers.forEach(function(c) { assert( ! utils.isNumeric(c)) }) })
})

describe('random', function() {
  it('is between lower and upper bounds', function() {
    for (var i = 0; i < 1000; i++) {
      var lower = i, upper = i + 10; // narrow range to test bounds
      var r = utils.random(lower, upper);
      assert((r >= lower) && (r <= upper));
    }
  })
})

describe('getRandomPassword', function() {
  it('is all alphanumeric', function() {
    utils.getRandomPassword(1000).split('').forEach(function(c) {
      assert(utils.isAlpha(c) || utils.isNumeric(c))
    })
  })
})

describe('getCanonicalName', function() {
  it('returns a canonical name', function() { assert.equal(utils.getCanonicalName('foo b-a,r  BAZ'), 'fooBarBaz') })
})

describe('secondsSince', function() {
  it('returns seconds since', function() {
    var now = new Date()
    var tenSecondsAgo = new Date(now.getTime() - (10 * 1000))
    var oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000))
    var oneYearAgo = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000))
    assert.equal(utils.secondsSince(tenSecondsAgo), 10)
    assert.equal(utils.secondsSince(oneHourAgo), 60 * 60)
    assert.equal(utils.secondsSince(oneYearAgo), 365 * 24 * 60 * 60)
  })
})

describe('yesterday', function() { /* TODO */ } )

describe('filledString', function() { /* TODO */ } )

describe('deleteObject', function() { /* TODO */ } )

describe('getURLParameter', function() { /* TODO */ } )
