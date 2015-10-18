var in_address = {name:"in",address:'mzcRawMVM8DkKaeEFFSFEfbsSej9pPBs5U'};
var out_address = {name:"out",address:'mjHrr7Nm2A2eWF72Q4C2HJ1NnxAkP5ZXQg'};

console.log('open %s',in_address.address)
console.log('close %s',out_address.address)

var rp = require('request-promise');

var ctx = {
    open_utxo : 0,
    open_current : 'mzcRawMVM8DkKaeEFFSFEfbsSej9pPBs5U',
    close_utxo : 0,
    close_current : 'mjHrr7Nm2A2eWF72Q4C2HJ1NnxAkP5ZXQg',
}

var eject = require('./eject');

var poll = function(ctx){
    return rp('https://test-insight.bitpay.com/api/addrs/' + [ctx.open_current, ctx.close_current].join(',') + '/utxo').then(JSON.parse).then(function(res){
        var open = res.filter(function(v){ return v.address === ctx.open_current }).length;
        var close = res.filter(function(v){ return v.address === ctx.close_current }).length;
        if(ctx.open_utxo < open){
            eject.open();
            ctx.open_utxo = open;
        }
        if(ctx.close_utxo < close){
            eject.close();
            ctx.close_utxo = close;
        }
    })
}

var update = function(ctx, sec){
    return poll(ctx).delay(sec * 1000).then(function(){
        return update(ctx, sec);
    })
}
update(ctx, 10);
