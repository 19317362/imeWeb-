var particals={
    common:{
        _main:['header','sidebar','footer','theme'],
        pcontent:[
        'logo','menu','navbar','navitem',
        'input','button'
        ]
    },
     index:{
        _main:['content'],
        pcontent:[

        ]
    },
    main:{
        _main:['content'],
        pcontent:[
        'aboutblock','functionblock','featuresblock','img','fangdian','team','team2',
        'caption','portlet2','timeline','timelinelist'
        ]
    }
}
for(var i in particals){
    for(var j in particals[i]){
        if(j=='_main'){
            particals[i][j].forEach(function(item){
                Handlebars.registerPartial(i+'_'+item,Handlebars.templates[i+'/'+item])
            })
        }else{
            particals[i][j].forEach(function(item){
                Handlebars.registerPartial(i+'_'+j+'_'+item,Handlebars.templates[i+'/'+j+'/'+item])
            })
        }
    }
}


