var expect=require('expect');

var{generateMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate the correct test case',()=>{

        var from='Prince';
        var text='Some Message';
        var message=generateMessage(from,text);

        expect(message.createdAt).toBe('number');
        expect(message).toInclude({from,text});
    });

});