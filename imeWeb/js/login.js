var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    username: {
                        required: true,
                        minlength:4                        
                    },
                    password: {
                        required: true
                    },
                    remember: {
                        required: false
                    }
                },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "post",
                    async: false,
                    url:g_url_login,
                    data:{
                    "userId":$(".login-form #userId").val(),
                    "password":$(".login-form #passWd").val()
                    },
                    success:function(data){
                        if(data.success){
                            g_current_user = $(".login-form #userId").val();
                            usernameCookieSave();
                            window.location.href="index.html";
                        }else{
                            alert("登陆错误");
                        }
                    }
                });
            }
        });



        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit();
                }
                return false;
            }
        });

        $('#forget-password').click(function(){
            $('.login-form').hide();
            $('.forget-form').show();
        });

        $('#back-btn').click(function(){
            $('.login-form').show();
            $('.forget-form').hide();
        });
    }

 
  

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();

            // init background slide images
            $('.login-bg').backstretch([
                "assets/pages/img/login/bg1.jpg",
                "assets/pages/img/login/bg2.jpg",
                "assets/pages/img/login/bg3.jpg"
                ], {
                  fade: 1000,
                  duration: 8000
                }
            );

            $('.forget-form').hide();

            var username = $.cookie("username");
            var password = $.cookie("password");
            var rmbUser = $.cookie("rmbUser")
            if( rmbUser == "true"){
                $(".login-form #userId").val(username);
                $(".login-form #passWd").val(password);
                $('#remeberMe').attr('checked',true);
            }
        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});

function usernameCookieSave() { 
    if ($("#remeberMe").prop("checked")) { 
        var username = $(".login-form #userId").val(); 
        var password = $(".login-form #passWd").val(); 
        $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie 
        $.cookie("username", username, { expires: 7 }); 
        $.cookie("password", password, { expires: 7 }); 
    }else{ 
        $.cookie("rmbUser", "false", { expire: -1 }); 
        $.cookie("username", "", { expires: -1 }); 
        $.cookie("password", "", { expires: -1 }); 
    } 
}; 