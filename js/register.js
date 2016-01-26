// 修改了第：8、11 、13、 51、55、57、80、82行
$(document).ready(function() {

	var count = 0;
	$(".reminds_confirm").click(function() {
		var newSrc, newColor, newBgc;
		count++;
		newSrc = count%2===0 ? "../imgs/checkbox_00.png" : "../imgs/checkbox_19.png";
		newColor = count%2===0 ? "#000" : "#fff";
		newBgc = count%2===0 ? "#E7E8EA" : "#F68120";
		dsiable = count%2===0 ? true : false;
		$(this).attr("src", newSrc);
		$(".log button").css({"background-color": newBgc, "color": newColor}).attr("disabled", dsiable);
	});

	
	// 发送验证码
	$(".receive_msg").click(function(){
		// console.log("click");

		var count = 5;
		var userPhoneNumb=$('#person').val();

		// 发送验证码
		$.ajax({

			type: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			url: context + "/producecode/produceCode",
			data:{"userPhoneNumb":userPhoneNumb},
			success: function(data, textStatus, jqXHR){
				test=data;

				$("#inf").text(data.desc);
				$("#inf").show(1000);
			
			},                                                              
			error: function(jqXHR, textStatus, errorThrown){
				mui.toast('未知错误');
				mui.toast(textStatus);
				mui.toast(errorThrown);
			}
		});

		
	});

	// 立即注册
	$(".btn_register").click(function(){
		var userPhoneNumb=$('#person').val();
		var checkCode=$('#pwd').val();
		var userPassword=$('#msg').val();
		var reg = /[0-9a-zA-Z\@\!\#\$\%\^\&\*\.\~]{6, 18}/;
		// var userSrc="userSrc";
		
		// 先判断密码格式是否正确
		if (reg.test(userPhoneNumb)) {
			// 约束当用户点击同意协议后才能进行注册
			if ($(".reminds_confirm").attr("src") === "../imgs/checkbox_19.png") {
				$.ajax({
					type: 'POST',
					contentType: 'application/x-www-form-urlencoded',
					url: context + "/h5/useroperate/regist",
					data:{"userPhoneNumb":userPhoneNumb,
						  "userPassword":userPassword,
						  "checkCode":checkCode,
						  // "userSrc":userSrc
						  },
					success: function(data, textStatus, jqXHR){

						test=data;
						$("#inf").text(data.desc);
						$("#inf").show(1000);
					
					},
					error: function(jqXHR, textStatus, errorThrown){
						mui.toast('未知错误');
						mui.toast(textStatus);
						mui.toast(errorThrown);
					}
				});
			} else {
				alert("未同意《斐讯用户注册协议》");
			} 
		} else {
				alert("密码格式错误！");
		}

	});

	$(".btn-log").attr("disabled", true);


	// 生成六位数字验证码
	$(".code").html(null);
	function createCode() {
		var code = "";
		var length = 6;
		var i;
		var str = "";
		var content;
		var codeSpan = $(".code");
		var arrColor = ["blue", "red", "green", "brown", "gray", "pink", "red", "green", "brown", "blue"];
		codeSpan.html(null);
		for (i = 0; i < length; i++) {
			index = Math.floor(Math.random() * 6);
			code = Math.floor(Math.random() * 10);
			str += code;
			color = arrColor[index];
			content = $("<i></i>").html(code);
			content.appendTo(codeSpan);
			$(".code i").eq(index).css({"color": color});
		}
		codeSpan.attr("data-val", str);
	}

	$(".receive_code").click(createCode);

	// 点击注册按钮进行注册
	$(".btn-log").click(function() {
		if ($("#msg").val() === $(".code").attr("data-val")) {
			alert("OK");
		} else {
			alert("error!");
		}
	});

});