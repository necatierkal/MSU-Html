
$(document).ready(function () {
    Page.Init();
});

let Page = {
    Init: function () {
        Page.Handler();
        Page.Clear();
    },
    Handler: function () {
        $(document).on("click", "#btn_cancel", function (e) {
            history.back(); //Javascript metodudur. 1 geriye gelir. İçerisine rakam belirtirsek o kadar geriye gelir.
        });
        $(document).on("click", "#btn_clear", function (e) {
            Page.Clear();
        });
    },
    Clear: function () {
    //    document.getElementsByClassName("Form-control").val = "";
    //    document.getElementsById("input_lastname").val = "";

        $("body :input").val(""); //body etiketinenin içerisindeki tüm inputlarını al, valuelarına boş atama yap. (Clear)
        $("#input_username").focus();
    }

}


let User = {
    Register: function () {

    }
}

console.log("Register javascript loaded.");

//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});