var expect = require("chai").expect;

describe('user input parser', function() {
  var parser = require("./../lib/normit").parser;

  describe('user provides correct options', function() {
    it('returns the object containing translation data', function(){
      var userOpts = {
        _: ['en', 'es', 'cowboy'],
        t: true,
        s: true
      };

      var parsedOpts = parser(userOpts);
      expect(parsedOpts.from).to.eq('en');
      expect(parsedOpts.to).to.eq('es');
      expect(parsedOpts.text).to.eq('cowboy');
      expect(parsedOpts.speak).to.eq(true);
      expect(parsedOpts.synonyms).to.eq(true);

      expect(parsedOpts.text).to.eq('cowboy');

      //text in brackets
      userOpts = {
        _: ['en', 'es', 'cowboy where are u?']
      };
      parsedOpts = parser(userOpts);
      expect(parsedOpts.text).to.eq('cowboy where are u?');

      //text without brackets
      userOpts = {
        _: ['en', 'es', 'cowboy', 'where', 'are', 'u?']
      };
      parsedOpts = parser(userOpts);
      expect(parsedOpts.text).to.eq('cowboy where are u?');
    });
  });

  describe('user provides incorrect options', function() {
    it('returns raises error', function(){
      var wrongOpts = {
        _: ['po', 'polski', 'cowboy'],
        t: true,
        s: true
      };

      var incorrectParsing = function() {
        parser(wrongOpts);
      };
      expect(incorrectParsing).to.throw(Error);
    });
  });
});
