$(function () {

    var files = document.getElementById('files');
    files.addEventListener('change', handleFileSelect, false);
    files.addEventListener('change', calculate, false);
    $("#files").on("change",function () {
        $("#hashTable").css("display","block");
    });


});

//获取了 File 引用后，实例化 FileReader 对象，以便将其内容读取到内存中。
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', theFile.name, '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}


function calculateMD5Hash(file, bufferSize) {
    var def = Q.defer();
    var fileReader = new FileReader();
    var fileSlicer = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    var hashAlgorithm = new SparkMD5();
    var totalParts = Math.ceil(file.size / bufferSize);
    var currentPart = 0;
    var startTime = new Date().getTime();
    fileReader.onload = function(e) {
        currentPart += 1;
        def.notify({
            currentPart: currentPart,
            totalParts: totalParts
        });
        var buffer = e.target.result;
        hashAlgorithm.appendBinary(buffer);
        if (currentPart < totalParts) {
            processNextPart();
            return;
        }
        def.resolve({
            hashResult: hashAlgorithm.end(),
            duration: new Date().getTime() - startTime
        });
    };
    fileReader.onerror = function(e) {
        def.reject(e);
    };
    function processNextPart() {
        var start = currentPart * bufferSize;
        var end = Math.min(start + bufferSize, file.size);
        fileReader.readAsBinaryString(fileSlicer.call(file, start, end));
    }
    processNextPart();
    return def.promise;
}


function calculate() {
    var input = document.getElementById('files');
    if (!input.files.length) {
        return;
    }

    var file = input.files[0];
    var bufferSize = Math.pow(1024, 2) * 10; // 10MB

    calculateMD5Hash(file, bufferSize).then(
        function(result) {
            // Success
            var tr,td1,td2;
            var trNodes = document.getElementsByTagName("tr");

            tr = document.createElement("tr");
            td1 = document.createElement("td");
            td2 = document.createElement("td");
            td1.innerHTML = "MD5";
            td2.innerHTML = result["hashResult"];
            tr.appendChild(td1);
            tr.appendChild(td2);
            $("#hashTable").append(tr);

        }
        // function(err) {
        //     // There was an error,
        // },
        // function(progress) {
        //     // We get notified of the progress as it is executed
        //     console.log(progress.currentPart, 'of', progress.totalParts, 'Total bytes:', progress.currentPart * bufferSize, 'of', progress.totalParts * bufferSize);
        //
        //
        // }
    );
}