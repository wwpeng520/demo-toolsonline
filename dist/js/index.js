$(function(){$(".remove-text-nodes").contents().filter(function(){return this.nodeType===3}).remove();$.ajax({url:"/userinfo/get",type:"get",dataType:"json",success:function(a){var b="您的地址："+a[3]+"，IP："+a[2]+"；您的硬件信息："+a[0]+"/"+a[1];$("#userinfo").text(b)},error:function(a,c,b){console.log("error "+c+" "+b)}})});