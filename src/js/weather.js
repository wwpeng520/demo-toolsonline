$(function(){
    let city;
    //查询当前城市天气
    $.get('/userinfo/get', {async: false}, function(data){  //当前城市查询提取
        let addrArr = data[3].split(" ");
        $("#currentCity").text(data[3]);
        if(addrArr[2]){
            city = addrArr[2];
        }else if(addrArr[1]){
            city = addrArr[1];
        }else{
            city = data;
        }
        getWearDatas(city);
    });

    //获取用户输入城市的天气
    $("#getWeatherData").click(function(){
       city = $("#cityEnter").val();
       $("#changeWord").text("您查询的城市：");
       $("#currentCity").text(city);
       getWearDatas(city);
    });
})

function getWearDatas(city){
    let key = '21253331b3a948bf88c76393827c6022';

    let url_now = "https://free-api.heweather.com/v5/now?city="+city+"&key="+key;
        $.get(url_now, function(data){  //根据城市获取当前天气
            let now =data.HeWeather5[0].now;
            let updateAt = data.HeWeather5[0].basic.update.loc;
            let src = "https://cdn.heweather.com/cond_icon/" + now.cond.code + ".png";
            // console.log(data);
            $("#weaNow img").attr('src',src);
            $("#weaNowTxt").text(now.cond.txt);
            $("#weaNowTmp").text("温度：" + now.tmp + "℃");
            $("#weaNowHum").text("相对湿度：" + now.hum + "%");
            $("#weaNowVis").text("能见度：" + now.vis + "km");
            $("#updateAt").text("更新时间：" + updateAt);
            $("#weaNowWindSc").text("风力等级：" + now.wind.sc);
        });
        
        let url_for = "https://free-api.heweather.com/v5/forecast?city="+city+"&key="+key;
        $.get(url_for, function(data){  //免费用户3天预报
            const forDay = 3;
            let dailyFor = data.HeWeather5[0].daily_forecast;
            // console.log(data);
            for(let i = 0; i < forDay; i++){
                let src_d = "https://cdn.heweather.com/cond_icon/" + dailyFor[i].cond.code_d + ".png";
                let src_n = "https://cdn.heweather.com/cond_icon/" + dailyFor[i].cond.code_n + ".png";
                $(".wea-for").eq(i).find(".wea-for-day-img").attr('src', src_d);
                $(".wea-for").eq(i).find(".wea-for-night-img").attr('src', src_n);
                $(".wea-for").eq(i).find(".wea-for-date").text(dailyFor[i].date);
                $(".wea-for").eq(i).find(".wea-for-txt-d").text(dailyFor[i].cond.txt_d);
                $(".wea-for").eq(i).find(".wea-for-txt-n").text(dailyFor[i].cond.txt_n);
                $(".wea-for").eq(i).find(".wea-for-tmp").text("温度：" + dailyFor[i].tmp.min + "-" + dailyFor[i].tmp.max + "℃");
                $(".wea-for").eq(i).find(".wea-for-hum").text("相对湿度：" + dailyFor[i].hum + "%");
                $(".wea-for").eq(i).find(".wea-for-vis").text("能见度：" + dailyFor[i].vis + "km");
                $(".wea-for").eq(i).find(".wea-for-wind-sc").text("风力等级：" + dailyFor[i].wind.sc + "级");
            }
        });

        let url_sug = "https://free-api.heweather.com/v5/suggestion?city="+city+"&key="+key;
        $.get(url_sug, function(data){  //生活指数
            let sug = data.HeWeather5[0].suggestion;
            // console.log(data);
            let sugNum = 0;
            for(x in sug){
                let title = x;
                let brf = sug[x].brf;
                let txt = sug[x].txt;
                switch(title){
                    case 'air':title='空气';
                    break;
                    case 'comf':title='舒适度';
                    break;
                    case 'cw':title='洗车';
                    break;
                    case 'drsg':title='穿衣';
                    break;
                    case 'flu':title='感冒';
                    break;
                    case 'sport':title='运动';
                    break;
                    case 'trav':title='旅游';
                    break;
                    case 'uv':title='紫外线';
                }
                $("#livSug li").eq(sugNum).find(".title").text(title);
                $("#livSug li").eq(sugNum).find(".brf").text(brf);
                $("#livSug li").eq(sugNum).find(".txt").text(txt);
                sugNum++;

            }
        });
}