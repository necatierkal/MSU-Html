console.log("Product/Index javascript loaded.");

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
        $(document).on("click", "#input_getProducts", function (e) {
            Product.GetProducts();
        });
   
        
    },
    Clear: function () {
    //    document.getElementsByClassName("Form-control").val = "";
    //    document.getElementsById("input_lastname").val = "";
        $("#div_products").css("display","none");//Başlangıçta boş products tablounu gösterme (nonw,block,hidden,show seçenekleri mevcut)
        //$("body :input").val(""); //body etiketinenin içerisindeki tüm inputlarını al, valuelarına boş atama yap. (Clear)      
    
    }  

}


let Product = {

    GetProducts: function () {
              
        //Client ve server arasındaki haberleşmeyi asenkron bir şekilde ajax (asenkron javascript) sağlar.
        $.ajax({
            type: "GET",        
            url: "http://localhost:22437/api/Products",
            contentType: "application/json",
            async: true

        }).done(function (res) {
            Utility.WriteLog(res);
            $("#table_products").DataTable({
                "destroy": true,
                "select": true,
                "autowidth": true,
                "data": res,
                "columns": [
                    { "data": "id" },
                    { "data": "name" },
                    { "data": "categoryId" },
                    { "data": "quantityPerUnit" },
                    { "data": "unitPrice" },
                    { "data": "unitsInStock" },
                    { "data": "discontinued" },
                    {
                        "render": function (data, type, row, meta) {
                            let updateButton = '<button style="padding:2px 4px; margin:2px;" title="Update Post" class="btn btn-warning" onclick="Product.Update(' + data.id + ');"><i class="fa fa-refresh"></i></button>\n\n';
                            let deleteButton = '<button style="padding:2px 4px; margin:2px;" title="Delete Post" class="btn btn-danger" onclick="Product.Delete(' + data.id + ');"><i class="fa-regular fa-trash-can"></i></button>\n\n';

                            return updateButton + deleteButton;
                        },
                        "data": null
                    }
                ]
            });
            $("#div_products").css("display", "block");   //Başlangıçta gösterme demiştik.Veriyi getirdikten sonra göster demeliyiz.
        })

    }
}


let Utility = {
    WriteLog: function (log) {
        console.log(log);
    }
  

}



//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});