$(function(){
    var kongbai={};
    for(var i=0;i<15;i++){
        $('<b>').addClass('hang').appendTo('.qipan')
        $('<i>').addClass('lie').appendTo('.qipan')
        for(var j=0;j<15;j++){
            kongbai[i+'-'+j]={x:i,y:j};
            $('<div>')
                .addClass('qizi')
                .attr('id',i+'-'+j)
                .data('pos',{x:i,y:j})
                .appendTo('.qipan')
        }
    }
    $('.qipan').slideUp();
    var hei={};
    var bai={};

    var kaiguan=true;
    var panduan=function(pos,biao){
       var h= 1,s= 1,zx= 1,yx=1;
       var tx, ty;


        //横向
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty-1)]){
            h++;ty--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty+1)]){
            h++;ty++;
        }


        //纵向
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1) + '-' + ty]){
            s++;tx--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1)+ '-' + ty]){
            s++;tx++;
        }


        //左斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty-1)]){
            zx++;tx++;ty--
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty+1)]){
            zx++;tx--;ty++
        }


        //右斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty+1)]){
            yx++;tx++;ty++;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty-1)]){
            yx++;tx--;ty--;
        }

         return Math.max(h,s,zx,yx)
    }
    var ai=function(){
            var max1=-Infinity;
            var zuobiao1;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],hei);
            if(weixie>max1){
                max1=weixie;
                zuobiao1=kongbai[i];
            }
        }
            var max2=-Infinity;
            var zuobiao2;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],bai);
            if(weixie>max2){
                max2=weixie;
                zuobiao2=kongbai[i];
            }
        }
        return (max1>max2)?zuobiao1:zuobiao2;
    }
    var isAi=true;
    $(".renren").on('click',function(){
        isAi=false;
        $('.qipan').slideDown();
    })
    $(".renji").on('click',function(){
        isAi=true;
        $('.qipan').slideDown();
    })
    $('.qizi').on('click',function(){

        var pos=$(this).data('pos');

        if($(this).hasClass('hei')||$(this).hasClass('bai')){
            return;
        }
        if(kaiguan) {
            $(this).addClass('hei');
            hei[pos.x + '-' + pos.y] = true;
            delete kongbai[pos.x + '-' + pos.y]
            if (panduan(pos, hei)>=5) {

                $('.qipan .qizi').off('click');
                $('.zhezhao1').css('display','block')
                return;
            }
            if(isAi){
                var pos=ai();
                $('#'+ pos.x + '-' + pos.y).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                delete kongbai[pos.x + '-' + pos.y];
                if (panduan(pos, bai)>=5) {

                    $('.qipan .qizi').off('click');
                    $('.zhezhao2').css('display','block')
                }
                return;
            }
        }else {
                $(this).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                if (panduan(pos, bai)>=5) {

                    $('.qipan .qizi').off('click');
                    $('.zhezhao2').css('display','block');

                }
            }
        kaiguan = !kaiguan;
    })
    $('.anniu').on('click',function(){
        location.reload();
    })





})