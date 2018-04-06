var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object',() => {
   var from  = 'HK';
   var text = 'some message';
   var message = generateMessage( from, text);
    
   expect(message.createAt).toBeA('number');
   expect(message).toInclude({from,text});
    //store res in value
    //assert from match
    //assert text match
    //assert createAT is number
    });
})