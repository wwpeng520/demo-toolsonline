$(function () {

    var text_encrypt;  //输入框字符
    var text_password;  //密钥框字符
    //鼠标移入文本框效果
    $("#encryptEnter").hover(function () {
        return $(this).select();
    });
    $("#encryptOut").hover(function () {
        return $(this).select();
    });
    $("#b642imgEnter").hover(function () {
        return $(this).select();
    });
    //加密类型点击事件
    $("#encryptTypes li").click(function () {
        $(this).addClass("clicked").siblings().removeClass("clicked");
    });
    //字符输入框获取焦点和失去焦点时
    $("#encryptenter").focus(function () {
        text_encrypt = $("#encryptEnter").val();
        if (text_encrypt == "this is an example"){
            $(this).val("");
        }else {
            $(this).select();
        }
    }).blur(function () {
        text_encrypt = $("#encryptEnter").val();
        if (text_encrypt == ""){
            $(this).val("this is an example");
        }
    });
    //密钥框获取焦点和失去焦点时
    $("#passwordEnter").focus(function () {
        $(this).val("");
    }).blur(function () {
        if ($(this).val() == ""){
            $(this).val("在此输入密钥");
        }
    });
    //点击第一排按钮时隐藏密钥输入框
    $("#btnArea0a .btn").click(function () {
        $("#passwordArea").stop().hide();
    });
    //点击第一排按钮时执行操作
    $("#md5Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(CryptoJS.MD5(text_encrypt));
    });
    $("#sha1Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(CryptoJS.SHA1(text_encrypt));
    });
    $("#sha224Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(CryptoJS.SHA224(text_encrypt));
    });
    $("#sha256Btn").click(function () {
        text_encrypt = $("#encryptEenter").val();
        $("#encryptOut").val(CryptoJS.SHA256(text_encrypt));
    });
    $("#sha384Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(CryptoJS.SHA384(text_encrypt));
    });
    $("#sha512Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(CryptoJS.SHA512(text_encrypt));
    });
    $("#sha3224Btn").click(function (e) {
        text_encrypt = $("#encryptEnter").val();
        event.preventDefault();                     //阻止a标签的默认跳转行为
        $("#encryptOut").val(CryptoJS.SHA3(text_encrypt, {outputLength : 224}));
    });
    $("#sha3256Btn").click(function (e) {
        text_encrypt = $("#encryptEnter").val();
        event.preventDefault();
        $("#encryptOut").val(CryptoJS.SHA3(text_encrypt, {outputLength : 256}));
    });
    $("#sha3384Btn").click(function (e) {
        text_encrypt = $("#encryptEnter").val();
        event.preventDefault();
        $("#encryptOut").val(CryptoJS.SHA3(text_encrypt, {outputLength : 384}));
    });
    $("#sha3512Btn").click(function (e) {
        text_encrypt = $("#encryptEnter").val();
        event.preventDefault();
        $("#encryptOut").val(CryptoJS.SHA3(text_encrypt, {outputLength : 512}));
    });
    $("#ripemd160Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(CryptoJS.RIPEMD160(text_encrypt));
    });
    $("#pbkdf2Btn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        var salt = CryptoJS.lib.WordArray.random(128/8);  //salt至少为8字节，且要为随机数
        $("#encryptOut").val(CryptoJS.PBKDF2(text_encrypt, salt,{
            keySize: 512/32,
            iterations: 500  //迭代次数定义为500次
        }));
    });
    //点击第二排按钮时执行操作
    $("#btnArea0b .btn").click(function () {
        var _this = this;
        $("#passwordArea").show();      //显示密钥输入区域,并显示其子代节点，可在此句后加.children().show()也可用$("#pwdGroup").stop().show();实现
        $("#passwordArea *").stop().show();
        $("#hmacBtn").text($(_this).text()+"转换");    //给密钥输入区域按钮添加对应文字
        $("#encryptOut").val("");  //清除转换结果输出框的字符
        var hmacID= $(this).attr("id");  //获取点击按钮的ID
        text_encrypt = $("#encryptEnter").val();
        //点击Hmac-* 转换按钮是执行对应方法的加密函数
        $("#hmacBtn").click(function () {
            text_password = $("#passwordEnter").val();     //此句不能放在 $("#Hmac_btn").click之前
            switch (hmacID)
            {
                case "hmacMd5Btn":
                    $("#encryptOut").val(CryptoJS.HmacMD5(text_encrypt,text_password));
                    break;
                case "hmacSha1Btn":
                    $("#encryptOut").val(CryptoJS.HmacSHA1(text_encrypt,text_password));
                    break;
                case "hmacSha224Btn":
                    $("#encryptOut").val(CryptoJS.HmacSHA224(text_encrypt,text_password));
                    break;
                case "hmacSha256btn":
                    $("#encryptOut").val(CryptoJS.HmacSHA256(text_encrypt,text_password));
                    break;
                case "hmacSha384btn":
                    $("#encryptOut").val(CryptoJS.HmacSHA384(text_encrypt,text_password));
                    break;
                case "hmacSha512btn":
                    $("#encryptOut").val(CryptoJS.HmacSHA512(text_encrypt,text_password));
                    break;
                case "hmacSha3btn":
                    $("#encryptOut").val(CryptoJS.HmacSHA3(text_encrypt,text_password));
                    break;
                case "hmacRipemd160Btn":
                    $("#encryptOut").val(CryptoJS.HmacRIPEMD160(text_encrypt,text_password));
            }
        });
    });

    //点击散列/哈希按钮页面效果
    $("#encryptTypes li").eq(0).click(function () {
        $("#btnArea div").show();        //显示全部按钮，然后把不是type0的给隐藏掉
        $("#sha3Btn *").show();
        $("#btnArea div:not(.type0)").stop().hide();
        $("#enterArea").show();         //标签页切换时需要把点击“图片/BASE64按钮”时隐藏的输入框给显示出来
        $("#enterArea span").text("输入要加密的字符串：");  //针对不同标签页设置不同提示文本
        $("#encryptEnter").show().text("this is an example");  //针对不同标签也输入框内默认文字不同
        $("#img2b64Area").css("display","none");       //把点击“图片/BASE64按钮”显示的区域给隐藏掉
        $("#passwordArea").hide();                    //把“散列/哈希”Hmac类型按钮的密钥框隐藏
        $("#encryptOut").val("");
    });
    //点击BASE64按钮页面效果
    $("#encryptTypes li").eq(1).click(function () {
        $("#btnArea div").show();
        $("#btnArea div:not(.type1)").stop().hide();
        $("#enterArea").show();
        $("#enterArea span").text("输入要编码/解码的字符串：");
        $("#encryptEnter").show().text("this is an example");
        $("#img2b64Area").css("display","none");
        $("#passwordArea").hide();
        $("#encryptOut").val("");
    });
    //点击加密/解密按钮页面效果
    $("#encryptTypes li").eq(2).click(function () {
        $("#btnArea div").show();
        $("#btnArea div:not(.type3)").stop().hide();
        $("#enterArea").show();
        $("#enterArea span").text("输入要加密的字符串：");
        $("#encryptEnter").show().text("this is an example");
        $("#img2b64Area").css("display","none");
        $("#passwordArea").hide();
        $("#encryptOut").val("");
    });

    // BASE64标签页BASE64编码与解码按钮调用方法
    $("#b64encodeBtn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(Base64.encode(text_encrypt));
    });
    $("#b64decodeBtn").click(function () {
        text_encrypt = $("#encryptEnter").val();
        $("#encryptOut").val(Base64.decode(text_encrypt));
    });


    //加密/解密标签页算法实现
    $("#ADRQencodeBtn").click(function () {
        var type = $("input[name=ADRQ]:checked").attr("id");
        text_encrypt = $("#encryptEnter").val();
        text_password = $("#passwordEnter").val();
        var encrypted;
        switch (type)
        {
            case "aesBtn":
                encrypted = CryptoJS.AES.encrypt(text_encrypt, text_password);
                break;
            case "desBtn":
                encrypted = CryptoJS.DES.encrypt(text_encrypt, text_password);
                break;
            case "rc4Btn":
                encrypted = CryptoJS.RC4.encrypt(text_encrypt, text_password);
                break;
            case "rabbitBtn":
                encrypted = CryptoJS.Rabbit.encrypt(text_encrypt, text_password);
                break;
            case "tripledesBtn":
                encrypted = CryptoJS.TripleDES.encrypt(text_encrypt, text_password);
        }
        encrypted = encrypted.toString();
        $("#encryptOut").val(encrypted);
    });
    $("#ADRQdecodeBtn").click(function () {
        var type = $("input[name=ADRQ]:checked").attr("id");
        text_encrypt = $("#encryptEnter").val();
        text_password = $("#passwordEnter").val();
        var decrypted;
        switch (type)
        {
            case "aesBtn":
                decrypted = CryptoJS.AES.decrypt(text_encrypt, text_password);
                break;
            case "desBtn":
                decrypted = CryptoJS.DES.decrypt(text_encrypt, text_password);
                break;
            case "rc4Btn":
                decrypted = CryptoJS.RC4.decrypt(text_encrypt, text_password);
                break;
            case "rabbitBtn":
                decrypted = CryptoJS.Rabbit.decrypt(text_encrypt, text_password);
                break;
            case "tripledesBtn":
                decrypted = CryptoJS.TripleDES.decrypt(text_encrypt, text_password);
        }
        decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
        $("#encryptOut").val(decrypted);
    });

});


// BASE64编码/解码算法
var Base64 = {
    // 转码表
    table : [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ],
    UTF16ToUTF8 : function(str) {
        var res = [], len = str.length;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            if (code > 0x0000 && code <= 0x007F) {
                // 单字节，这里并不考虑0x0000，因为它是空字节
                // U+00000000 – U+0000007F 	0xxxxxxx
                res.push(str.charAt(i));
            } else if (code >= 0x0080 && code <= 0x07FF) {
                // 双字节
                // U+00000080 – U+000007FF 	110xxxxx 10xxxxxx
                // 110xxxxx
                var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                // 10xxxxxx
                var byte2 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2)
                );
            } else if (code >= 0x0800 && code <= 0xFFFF) {
                // 三字节
                // U+00000800 – U+0000FFFF 	1110xxxx 10xxxxxx 10xxxxxx
                // 1110xxxx
                var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                // 10xxxxxx
                var byte2 = 0x80 | ((code >> 6) & 0x3F);
                // 10xxxxxx
                var byte3 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2),
                    String.fromCharCode(byte3)
                );
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                // 四字节
                // U+00010000 – U+001FFFFF 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                // 五字节
                // U+00200000 – U+03FFFFFF 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                // 六字节
                // U+04000000 – U+7FFFFFFF 	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }
        return res.join('');
    },
    UTF8ToUTF16 : function(str) {
        var res = [], len = str.length;
        var i = 0;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            // 对第一个字节进行判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var byte1 = (code & 0x1F) << 6;
                var byte2 = code2 & 0x3F;
                var utf16 = byte1 | byte2;
                res.push(Sting.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var code3 = str.charCodeAt(++i);
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                var utf16 = ((byte1 & 0x00FF) << 8) | byte2
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }
        return res.join('');
    },
    encode : function(str) {
        if (!str) {
            return '';
        }
        var utf8    = this.UTF16ToUTF8(str); // 转成UTF8
        var i = 0; // 遍历索引
        var len = utf8.length;
        var res = [];
        while (i < len) {
            var c1 = utf8.charCodeAt(i++) & 0xFF;
            res.push(this.table[c1 >> 2]);
            // 需要补2个=
            if (i == len) {
                res.push(this.table[(c1 & 0x3) << 4]);
                res.push('==');
                break;
            }
            var c2 = utf8.charCodeAt(i++);
            // 需要补1个=
            if (i == len) {
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[(c2 & 0x0F) << 2]);
                res.push('=');
                break;
            }
            var c3 = utf8.charCodeAt(i++);
            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
            res.push(this.table[c3 & 0x3F]);
        }

        return res.join('');
    },
    decode : function(str) {
        if (!str) {
            return '';
        }

        var len = str.length;
        var i   = 0;
        var res = [];

        while (i < len) {
            code1 = this.table.indexOf(str.charAt(i++));
            code2 = this.table.indexOf(str.charAt(i++));
            code3 = this.table.indexOf(str.charAt(i++));
            code4 = this.table.indexOf(str.charAt(i++));

            c1 = (code1 << 2) | (code2 >> 4);
            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
            c3 = ((code3 & 0x3) << 6) | code4;

            res.push(String.fromCharCode(c1));

            if (code3 != 64) {
                res.push(String.fromCharCode(c2));
            }
            if (code4 != 64) {
                res.push(String.fromCharCode(c3));
            }

        }

        return this.UTF8ToUTF16(res.join(''));
    }
};
