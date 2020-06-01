var moment=require('moment');

//For sending normal message
var generateMessage=(from,text)=>{
    return {
        from,
        text,
        createdAt: moment.valueOf()
    };
};

//For sending location url
var generateLocationMessage=(from, latitude,longitude)=>{
    return{
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment.valueOf()
    }
};

module.exports={generateMessage, generateLocationMessage};

