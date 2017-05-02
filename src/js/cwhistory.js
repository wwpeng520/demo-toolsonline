$(function(){
    console.log('ddfafa');
    $.get("/cutwords/history/guest", (data,status) => {
        console.log(data);
        let  table,tr,th1,th2,th3,td1,td2,td3;
        table = document.createElement("table");
        $("#hisDisplay").append(table);
        tr = document.createElement("tr");
        th1 = document.createElement("th");
        th1.innerHTML = '访问者IP';
        th2 = document.createElement("th");
        th2.innerHTML = '访问时间';
        th3 = document.createElement("th");
        th3.innerHTML = "输入内容";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        table.appendChild(tr);
        for(let i = data.length-1; i >= 0; i--){
            tr = document.createElement("tr");
            td1 = document.createElement("td");
            td1.innerHTML = data[i].ip;
            td2 = document.createElement("td");
            td2.innerHTML = data[i].createdAt;
            td3 = document.createElement("td");
            td3.innerHTML = data[i].wordsInput;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            table.appendChild(tr);
        }

    });
    

})