//根据类型适配图标的Helper
Handlebars.registerHelper("addIcon",function(value){
  if(new RegExp("ChangeActivity").test(value)){
    return "iconfont icon-zimuc";
  }else if(new RegExp("TransZipFile").test(value)){
    return "iconfont icon-zimut";
  }else{
    return "iconfont icon-zimux";
  }
});

//根据用户名适配头像的Helper
Handlebars.registerHelper("addUserImage",function(value){
  if(value == "hurong"){
    return "img/user-img/hurong.jpg";
  }else if(value == "dujing"){
    return "img/user-img/dujing.jpg";
  }else{
    return "img/user-img/undefined.jpg";
  }
});

//根据关注文档适配icon的Helper
Handlebars.registerHelper("ditaBookShowIcon",function(value){
  if(value == 0){
    return "icon-pie-chart";
  }else if(value == 1){
    return "icon-user";
  }else if(value == 2){
    return "icon-map";
  }else if(value == 3){
    return "icon-music-tone-alt";
  }
});


// trans Map Topic  Task  Reference  Glossary  Concept  WARNING  Note Scheme

// HTML PDF ChangeActivity Image


//根据收藏列表适配icon的Helper
Handlebars.registerHelper("FavoriteItemsShowIcon",function(value){
if(new RegExp("Map").test(value)){
       return 'Map';
    }
     else if(new RegExp("trans").test(value)){
        return 'trans';
    }
    else if(new RegExp("Image").test(value)){
        return 'Image';
    }
    else if(new RegExp("ChangeActivity").test(value)){
        return 'ChangeActivity';
    }
    else if(new RegExp("HTML"||"PDF").test(value)){
       return 'HTML_PDF';
    }
    else{
       return 'doc';
    }
});




//足迹区域icon背景色沿用FavoriteItemsShowIcon的Helper，但背景色与图标已经变化
Handlebars.registerHelper("recentShowIcon",function(value){
if(new RegExp("Map").test(value)){
       return 'zujishu';
    }
     else if(new RegExp("trans").test(value)){
        return 'zujitans';
    }
    else if(new RegExp("Image").test(value)){
        return 'zujitupian';
    }
    else if(new RegExp("ChangeActivity").test(value)){
        return 'zujivoice';
    }
    else if(new RegExp("Topic").test(value)){
        return 'topic';
    }
    else if(new RegExp("HTML"||"PDF").test(value)){
       return 'zujiwrite';
    }
    else{
       return 'zujidanye';
    }
});

