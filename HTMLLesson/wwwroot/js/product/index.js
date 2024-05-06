console.log("Product/Index javascript loaded.");

$(document).ready(function () {// Bu jQuery fonksiyonu, sayfanın tamamen yüklendiğinde çalıştırılacak kodları belirtir.
    Page.Init();//Sayfa yüklendiğinde Page objesinin Init fonksiyonunu çağırır.
 
});

let Page = { //Page adında bir obje oluşturduk. Bu obje sayfa işlemleri için kullanılacak fonksiyonları içerir.
    Init: function () {//Page objesinin Init metodu, sayfa başlangıcını yapılandırır. İlgili işlemleri çağırır.
        Page.Handler();//Kullanıcı etkileşimlerini ele alacak olan fonksiyonu tanımlar. Örneğin, butonlara tıklama gibi olayları dinler.
        Page.Clear();  //Sayfada temizlik yapacak olan fonksiyonu tanımlar. Örneğin, form alanlarını temizler veya görsel öğeleri gizler.    
    },
    Handler: function () {
        $(document).on("click", "#btn_cancel", function (e) {
            history.back(); //Javascript metodudur. 1 geriye gelir. İçerisine rakam belirtirsek o kadar geriye gelir. İptal butonuna tıklandığında geri gitmeyi sağlayacak olan fonksiyonu tanımlar.
        });
        $(document).on("click", "#btn_clear", function (e) {
            Page.Clear();//Temizleme butonuna tıklandığında form alanlarını temizleyecek olan fonksiyonu tanımlar.
        });
        $(document).on("click", "#input_getProducts", function (e) {
            Product.GetProducts();//Ürünleri getirme butonuna tıklandığında ürünleri getirecek olan fonksiyonu tanımlar.
        });
   
        
    },
    Clear: function () {
    //    document.getElementsByClassName("Form-control").val = "";
    //    document.getElementsById("input_lastname").val = "";
        $("#div_products").css("display", "none");//Başlangıçta boş products tablounu gösterme
        /*
        display CSS özelliğinin değeri olarak none dışında birkaç farklı değer kullanılabilir. Bazı yaygın kullanılan değerler ve ne işe yaradıkları:

            block: Bu değer, bir öğenin bir blok düzende görüntülenmesini sağlar. Öğe, alt ve üst öğelerden bağımsız bir satırda başlar ve bitirir.
            inline: Bu değer, bir öğenin bir satırda diğer içerikle birlikte görüntülenmesini sağlar. Öğe, çevresindeki içerikle aynı satırda başlar ve biter.
            inline-block: Bu değer, bir öğenin satır içi gibi görünmesini sağlar, ancak blok gibi davranmasını sağlar. Yani, öğe diğer içerikle aynı satırda başlar ve biter, ancak genişlik ve yükseklik gibi blok özelliklerine sahiptir.
            flex: Bu değer, bir öğenin esnek bir kutu modeline sahip olmasını sağlar. flex konteynerindeki öğeler, esneklik, büyüme, daralma ve hizalama gibi özelliklere sahip olabilir.
            grid: Bu değer, bir öğenin bir ızgara düzende görüntülenmesini sağlar. Öğeleri satır ve sütunlarla hizalayabilir ve konumlandırabilirsiniz.
            table: Bu değer, bir öğenin bir tablo olarak görüntülenmesini sağlar. Ancak, gerçek bir HTML tablosu yerine CSS ile oluşturulan bir tabloya benzer şekilde davranır.
            initial: Bu değer, bir özelliğin varsayılan değerini almasını sağlar.
            inherit: Bu değer, bir özelliğin değerini, belirtilen özelliği içeren elemanın ebeveyn öğesinden almasını sağlar.
        */
        //$("body :input").val(""); //body etiketinenin içerisindeki tüm inputlarını al, valuelarına boş atama yap. (Clear)      
    
    }  

}


let Product = {
    //Product adında bir obje oluşturur. Bu obje ürün işlemleri için kullanılacak fonksiyonları içerir.
    GetProducts: function () {
              
        //Bu kodun genel amacı, bir API'den ürün verilerini çekmek, bu verileri bir tablo içinde kullanıcıya göstermek ve her bir satırda güncelleme ve silme işlemlerini gerçekleştirebilmek için butonlar eklemektir.

        // Ürünleri getirmek için API'ye bir GET isteği yapacak olan fonksiyonu tanımlar.
        $.ajax({
            type: "GET",        
            url: "http://localhost:5222/api/Products",
            contentType: "application/json",
            async: true

        }).done(function (res) {
            Utility.WriteLog(res);
            $("#table_products").DataTable({//DataTables eklentisi ile bir tablo oluşturuluyor. Bu tablonun içeriği, aldığımız ürünlerin listesi olacak. DataTables, veri tabanlı bir tablo oluşturmak için kullanılan bir jQuery eklentisidir.
                "destroy": true,//Varolan bir tablonun varsa önce yok edilmesi belirtiliyor. Yani, mevcut bir tablo varsa, onu sil.
                "select": true,//Tabloda satırların seçilebilir olmasını sağlar.
                "autowidth": true,//Tablonun otomatik genişlemesini sağlar.
                "data": res,//Tablonun içeriği, AJAX isteğiyle gelen yanıt olan res ile dolduruluyor. Bu, API'den alınan ürün verileridir.
                "columns": [ //Tablonun sütunları belirtiliyor. Her sütunun, gelen veri içinde hangi özelliği temsil ettiği belirtiliyor.
                    { "data": "id" },
                    { "data": "name" },
                    { "data": "categoryId" },
                    { "data": "quantityPerUnit" },
                    { "data": "unitPrice" },
                    { "data": "unitsInStock" },
                    { "data": "discontinued" },
                    {
                        "render": function (data, type, row, meta) {//Bu fonksiyon, tablo hücresine içerik yerleştirmek için kullanılıyor. Burada, her bir satır için bir "Güncelle" ve "Sil" butonu ekleniyor.
                            let updateButton = '<button style="padding:2px 4px; margin:2px;" title="Update Post" class="btn btn-warning" onclick="Product.Update(' + data.id + ');"><i class="fa fa-refresh"></i></button>\n\n';
                            let deleteButton = '<button style="padding:2px 4px; margin:2px;" title="Delete Post" class="btn btn-danger" onclick="Product.Delete(' + data.id + ');"><i class="fa-regular fa-trash-can"></i></button>\n\n';

                            return updateButton + deleteButton;
                        },
                        "data": null// Bu sütun, veri içeriği olmayacak, yalnızca butonlar içerecek.
                    }
                ]
            });
            $("#div_products").css("display", "block");   //Başlangıçta gösterme demiştik.Veriyi getirdikten sonra göster demeliyiz.Ürünlerin listelendiği div'in görünürlüğü açılıyor. Bu, ürünlerin listesinin kullanıcıya gösterilmesini sağlar.
        })

    }
}


let Utility = {//Utility adında bir obje oluşturur. Bu obje yardımcı işlevleri içerir.
    WriteLog: function (log) {
        console.log(log);
    }
  

}



//$(document).on("click", "#btn_clear", function (e) {
//    console.log("Clear button clicked.");
//});