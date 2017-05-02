$(function(){
	var addtext = "";
	//鼠标移入文本框效果
    $("#textIn").hover(function () {
        return $(this).select();
    });

	//点击“Big Bang”
	$("#bigBang").click(function(){
		var params = $("#textIn").val();
		$("#bigBangArea").text("").show();
		$("#textArea").hide();
		$("#txtInsert").val("");
		$.ajax({
			data: {
				text:params
			},
			url: '/cutwords/bigBang',
			type: 'post',
			dataType: 'json',
			success: function(data){
				var span;
				for(var i = 0; i < data.length; i++){
					span = document.createElement("span");
					span.innerHTML = data[i];
					$("#bigBangArea").append(span);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('error ' + textStatus + " " + errorThrown);  
			}
		});
	});


	//点击选取词块
	$("#bigBangArea").on('click','span',function(){
		$(this).addClass("clicked");
		addtext += $(this).text();
		$("#txtInsert").val(addtext);
	});
	//显示选中文本框鼠标移入选中
	$("#txtInsert").mouseenter(function(){
		return $(this).select();
	});
	//点击清除选中
	$("#clearSelected").click(function(){
		$("#bigBangArea span").removeClass("clicked");
		$("#txtInsert").val("");
	});

	//点击“频率统计”
	$("#highFreqWords").click(function(){
		var params = $("#textIn").val();
		var topN = 10;	//定义规定的高频词数量
		$("#bigBangArea").text("");
		$("#textArea").hide();
		$("#bigBangArea").show();
		//匹配汉字，“'”，a-z，A-Z，0-9,“-”,半角空格，全角空格\u3000
		params = params.replace(/[^\u4e00-\u9fa5\u0027\u0061-\u007a\u0041-\u005a\u0030-\u0039\u0020]/g,"");
		$.ajax({
			data: {
				text:params
			},
			url: '/cutwords/highFreqWords',
			type: 'post',
			dataType: 'json',
			success: function(data){
				var dataArray = data;
				//显示高频词个数（如果输入结果的分词数小于规定的topN，则输出所有分词，反之输出topN个分词结果）
				var num = topN > dataArray.length ? dataArray.length :topN; 
				//输出高频词表格
				var table,tr,th1,th2,td1,td2;
				if(num){
					table = document.createElement("table");
					$("#bigBangArea").append(table);
					tr = document.createElement("tr");
					th1 = document.createElement("th");
					th1.innerHTML = "高频词汇";
					th2 = document.createElement("th");
					th2.innerHTML = "出现次数";
					tr.appendChild(th1);
					tr.appendChild(th2);
					table.appendChild(tr);
					for(var i = 0; i < num; i++){
						tr = document.createElement("tr");
						td1 = document.createElement("td");
						td1.innerHTML = dataArray[i][0];
						td2 = document.createElement("td");
						td2.innerHTML = dataArray[i][1];
						tr.appendChild(td1);
						tr.appendChild(td2);
						table.appendChild(tr);
					}
				} else{
					p = document.createElement("p");
					p.innerHTML = "*您没有输入或者您输入的词语为我们收集在停顿词词典的无特别意义词汇！";
					$("#bigBangArea").append(p);
				}

			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('error ' + textStatus + " " + errorThrown);  
			}
		});
	});
		
	//点击返回按钮
	$("#returnTo").click(function(){
		$("#textArea").show();
		$("#bigBangArea").hide();
	});
	
});

