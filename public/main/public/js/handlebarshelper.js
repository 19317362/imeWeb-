function calculate_md(md){
  if(!md) return '6-2-10'
    if(md=='L')return '12-2-10'

  }

Handlebars.registerHelper("caculate_group",function(md){
  var md=calculate_md(md)
  return md.split('-')[0]
});

Handlebars.registerHelper("caculate_label",function(md){
  var md=calculate_md(md)
  return md.split('-')[1]
});

Handlebars.registerHelper("caculate_input",function(md){
  var md=calculate_md(md)
  return md.split('-')[2]
});



