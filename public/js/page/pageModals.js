/**
 * Created by mashroom on 17/3/13.
 */

Handlebars.registerPartial('modals_createfilemodal',Handlebars.templates['modals/createfilemodal'])
Handlebars.registerPartial('modals_input12',Handlebars.templates['modals/partical/input12'])
Handlebars.registerPartial('modals_select',Handlebars.templates['modals/partical/select'])
Handlebars.registerPartial('modals_inputfile',Handlebars.templates['modals/partical/inputfile'])
Handlebars.registerPartial('modals_textarea',Handlebars.templates['modals/partical/textarea'])
Handlebars.registerPartial('modals_submit',Handlebars.templates['modals/partical/submit'])
Handlebars.registerPartial('modals_static',Handlebars.templates['modals/partical/static'])
Handlebars.registerPartial('modals_createchangesmodal',Handlebars.templates['modals/createchangesmodal'])
Handlebars.registerPartial('modals_tree',Handlebars.templates['modals/treemodals'])


$('body').append(Handlebars.templates['modals/createfile']({}))
// $('body').append(Handlebars.templates['modals/createchangesmodal']({}))


    $('#jstree_1').jstree({
    'core' : {
      'data' : [
        { "text" : "Root node", "children" : [
            { "text" : "Child node 1" },
            { "text" : "Child node 2" }
          ]
        }
      ]
    }
  })


// $('#modal_createfile').modal()
// $('#modals_createfile_tree').modal()





