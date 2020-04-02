var banner=(function(){
    var ban='<div class="slider" id="slider">'
    +'<div class="slide"><img src="img/b5.png" alt=""></div>'
    +'<div class="slide"><img src="img/b1.png" alt=""></div>'
    +'<div class="slide"><img src="img/b2.png" alt=""></div>'
    +'<div class="slide"><img src="img/b3.png" alt=""></div>'
    +'<div class="slide"><img src="img/b4.png" alt=""></div>'
    +'<div class="slide"><img src="img/b5.png" alt=""></div>'
    +'<div class="slide"><img src="img/b1.png" alt=""></div>'
    +'</div>'
    +'<span id="left" ><</span>'
    +'<span id="right">></span>'
    +'<ul class="nav" id="navs">'
        +'<li>1</li>'
        +'<li>2</li>'
        +'<li>3</li>'
        +'<li>4</li>'
        +'<li>5</li>'
    +'</ul>',
    cfg={
        container:'#box',
        count:5,//指的是轮播的图片
        time:3000
    };
    function show(conf){
        $.extend(cfg,conf);
        $(cfg.container).append(ban);
        var num=1,timer;
        $li=$('#navs').children('li');
        function circleRed(num){
            var num2=num;
            if(num2==cfg.count+1){
                num2=1;
            }
            if(num2==0){
                num2=cfg.count;
            }
            for(var i=0;i<$li.length;i++){
                if(i+1==num2){
                    $($li.get(i)).css({
                        'background-color':'red'
                    })
                }
                else{
                    $($li.get(i)).css({
                        'background-color':'#ccc'
                    })
                }
            }
        }
        function isLeft(){
            num--;
            if(num<0){
                $('#slider').css({
                    left:'-6000px'
                })
                num=cfg.count-1;
            }
            circleRed(num);
                 $('#slider').animate({
                left:-1200*num+'px'
                },700)
        }
        function isRight(){
            num++;
            if(num>cfg.count+1){
                $('#slider').css({
                    left:'-1200px'
                })
                num=2;
            }
            circleRed(num);
            $('#slider').animate({
                left:-1200*num+'px'
            },700)
        }
        function time(){
            timer=setInterval(function(){
                isRight();
            },cfg.time);
        }
        circleRed(num);
        time();
        $(cfg.container).hover(function(){
            $('#left').css({
                'opacity':1
            })
            $('#right').css({
                'opacity':1
            })
            clearInterval(timer);
        },function(){
            $('#left').css({
                'opacity':0
            })
            $('#right').css({
                'opacity':0
            })
            time();
        })
        $('#right').click(function(){
            clearInterval(timer);
            console.log($('#slider').is(':animated'));
            if(!($('#slider').is(':animated'))){
                isRight();
            }
            
        })
        $('#left').click(function(){
            clearInterval(timer);
            if(!($('#slider').is(':animated'))){
                isLeft();
            }
        })
        for(var i=0;i<$li.length;i++){
            (function(i){
                $($li.get(i)).click(function(){
                    console.log(i);
                    num=i+1;
                    $('#slider').animate({
                        left:-1200*num+'px'
                    },700)
                    circleRed(i+1);
                })
            })(i)
            
        }
    }
    return {
        show:show
    }
}());