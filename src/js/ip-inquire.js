$(function(){

    //引用百度地图API
    $.ajax({
        url: "https://api.map.baidu.com/location/ip?ak=QYXX0FZjMfaBwyF12fLCjYDwb4FgV1qD&coor=bd09ll",
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
            // console.log(data);
            var addr = data.address.split('|');
            $("#tab_addr").text(addr[0] + ", " + addr[1] + ", " + addr[2]);
            $("#tab_longitude").text(data.content.point.x);
            $("#tab_latitude").text(data.content.point.y);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);  
        }
    });
    //获取客户端IP并显示在表格内
    $.ajax({
        url: '/userinfo/getClientInfo',
        type: 'get',
        dataType: 'json',
        success: function(data){
            $("#tab_ip").text(data[2]);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);  
        }
    });
    //输入ip查询结果
    $("#getIpInfo").click(function(){
        var ip = $("#ipEnter").val();
        var myurl = "https://api.map.baidu.com/location/ip?ak=QYXX0FZjMfaBwyF12fLCjYDwb4FgV1qD&ip=" + ip + "&coor=bd09ll";
        var reg = /^(1\d{2,2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[1-9])(\.(1\d{2,2}|2[0-4][0-9]|25[0-5]|[1-9][0-9]|[0-9])){3,3}$/;
        if(ip && ip.match(reg) ){
            ip = ip.match(reg)[0];
            $.ajax({
                url: myurl,
                type: 'get',
                dataType: 'jsonp',
                success: function(data){
                    // console.log(data);
                    if(data.status === 0){
                        var addr = data.address.split('|');
                        $("#tabHeader").text("您输入的IP信息：");
                        $("#tab_ip").text(ip);
                        $("#tab_addr").text(addr[0] + ", " + addr[1] + ", " + addr[2]);
                        $("#tab_longitude").text(data.content.point.x);
                        $("#tab_latitude").text(data.content.point.y);
                    }else{
                        $("#tabHeader").text("错误信息：" + data.message);
                        $("#tab_ip").text(ip);
                        $("#tab_addr").text("");
                        $("#tab_longitude").text("");
                        $("#tab_latitude").text("");
                     }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log('error ' + textStatus + " " + errorThrown);  
                }
            });
        }else{
            $("#tabHeader").text("请输入要正确的IP地址！");
        }
        
	});



})