/********************************************工具函数*********************************************************/
imeWeb.tools = {

    /*全选功能*/
    H_allChecked: function (allCheckBtn, childCheckBtn) {
        if (!allCheckBtn || !childCheckBtn) {
            console.warn("imeWeb.tools.H_allChecked参数错误！");
            return;
        }
        /*子复选框点击事件*/
        $(childCheckBtn).parent().parent().parent().bindOne('click', function (e) {
            var checkedBox = $($(this).children('td')[0]).children().find('input')[0];
            checkedBox.checked = !checkedBox.checked;
            $(allCheckBtn).prop('checked', imeWeb.tools.checkAll(childCheckBtn, 'checked', "allChecked"));
        });
        /*全选框点击事件*/
        allCheckBtn.bindOne('click', function (e) {
            allcheckedFn(childCheckBtn, $(this));
        });
        /*全选*/
        function allcheckedFn(children, thisEle) {
            bodyCh = children;//tbody中多选框
            var _t = thisEle;
            var allchecked = _t.checked || _t.prop('checked');
            allchecked = ischecked(allchecked);
            bodyCh.each(function (v, e) {
                e.checked = allchecked;
            })
        }

        /*是否选中*/
        function ischecked(cc) {
            return !!cc ? true : false;
        }
    },
    /*删除被选中的行*/
    deleteCheckedRow: function (deleteBtn, dataTable, allCheckedBtn, alterBox, beforeDelete) {
        $(deleteBtn).bindOne('click', function (e) {
            var res = true;
            if (!dataTable || !allCheckedBtn) {
                console.warn("imeWeb.tools.deleteCheckedRow参数错误");
                return;
            }
            if (imeWeb.tools.checkAll(allCheckedBtn, 'checked', "hasChecked")) {
                allCheckedBtn.each(function (v, ele) {
                    if (ele.checked || $(ele).prop('checked')) {
                        if (beforeDelete) {
                            res = beforeDelete($(ele).parent().parent().parent());
                        }
                        if (res) {
                            dataTable.row($(ele).parent().parent().parent()).remove().draw();
                            imeWeb.tools.globalAlert(alterBox, "删除成功！", 'success');
                        } else {
                            imeWeb.tools.globalAlert(alterBox, "删除失败！", 'success');
                        }
                    }
                });
            } else {
                if (alterBox) {
                    imeWeb.tools.globalAlert(alterBox, "请选择要删除的项", 'fail');
                }
            }
        });
    },

    /*检查是否有未被选中的项(没有属性attr)*/
    checkAll: function (eles, attr, flag) {
        switch (flag) {
            case "allChecked":
                for (var i = 0, l = eles.length; i < l; i++) {
                    if (!eles[i][attr] || !$(eles[i]).prop(attr)) {
                        return false;
                    }
                }
                return true;//都选中了
            case "hasChecked":
                console.log(eles.parent().find(':checked'));
                if (eles.parent().find(':checked').length != 0) {
                    return true;
                }
                // for (var ii = 0, ll = eles.length; ii < ll; ii++) {
                //     if (eles[ii][attr] || $(eles[ii]).prop(attr)) {
                //         return true;//有被选中的
                //     }
                // }
                return false;
        }

    },
    /*添加一行*/
    addRow: function (addBtn, dataTable, data, callback) {
        $(addBtn).bindOne('click', function () {
            dataTable.rows.add(data).draw();
            if (callback) {
                callback(dataTable, data);
            }
        });
    },
    /*全局弹出框*/
    globalAlert: function (boxId, msg, type,preppend_append) {
        var type = type || 'success';
        var preppend_append=preppend_append||'append'
        switch (type) {
            case 'success': {
                App.alert({
                    container: boxId,
                    place: preppend_append,
                    type: 'success',
                    message: msg,
                    close: true,
                    reset: true,
                    focus: true,
                    closeInSeconds: 2,
                    icon: 'fa fa-check'
                });
                break;
            }
            case 'fail': {
                App.alert({
                    container: boxId,
                    place: preppend_append,
                    type: 'danger',
                    message: msg,
                    close: true,
                    reset: true,
                    focus: true,
                    closeInSeconds: 2,
                    icon: 'fa fa-close'
                });
                break;
            }
        }
    },
    /*获取表格所有数据*/
    getAllTableData: function (tableEle, keys, others) {
        var res = [];
        var trs = tableEle.children("tbody").children();
        for (var i = 0, l = trs.length; i < l; i++) {
            var tds = $(trs[i]).children('td:gt(0)');
            var item = {};
            for (var keysi = 0, keysl = keys.length; keysi < keysl; keysi++) {
                item[keys[keysi]] = $(tds[keysi]).text();
            }
            if (others) {
                for (k in others) {
                    item[k] = others[k];
                }
            }
            res.push(item);
        }
        return res;
    },
    /*浮动按钮*/
    /*
     * table:# + 表格id
     * content:浮动按钮内的内容，文字、html或DOM元素
     * callback:有三个参数,table、按钮本身、当前的tr
     * otherCss:自定义样式，穿个对象
     * */
    floatBox: function (table, content, callback, otherCss) {
        var div = document.createElement('div');
        var allTr = $(table).children('tbody').children('tr');
        var currentTr = null;
        $(div).css({
            height: "auto",
            'text-align':'center',
            'padding':"7px 0.5rem",
            border: "1px solid #ccc",
            position: "absolute",
            "z-index": 999,
            "background-color": "#fff"
        });
        if (otherCss) {
            $(div).css(otherCss);
        }
        $(div).html(content);
        $(div).attr('id', 'floatBtn');
        $(table).children('tbody').append(div);
        $(div).hide();
        // allTr.stop(true);
        // allTr.removeEvent('mouseout');
        $(table).children('tbody').bindOne('mouseover', function (e) {
            /*bug解决*/
            if ($(table).children('tbody').children('#floatBtn')[0] == undefined) {
                $(table).children('tbody').append(div);
            }
            $(div).show();
            var position = $(this).children(':last').position();
            $(div).css({
                left: position.left + 56 + 'px',
                top: position.top + 'px'
            });
            currentTr = $(this);
            if (Object.prototype.toString.call(callback) == '[object Function]') {
                callback(table, $(div), currentTr);
            }
        }, 'tr');
        // $(table).bindOne('mouseout',function (e) {
        //     var ev=e||window.event;
        //     console.log(ev.currentTarget)
        //     $(div).hide();
        // });

        return false;
    },
    /*选中一行*/
    checkedOneTr:function (table,callback) {
        $(table).children('tbody').on('click','tr', function () {
            var _t = $(this);
            _t.siblings().removeClass('selected');
            _t.addClass('selected');
            _t.children('td').removeClass('sorting_1');
            if (Object.prototype.toString.call(callback) == '[object Function]') {
                callback(_t);
            }
        });
    },
    /*检验表格是否存在某条数据*/
    checkRepeat:function (dataTable,key,value) {
        var allData=dataTable.rows().data().pluck(key);
        return allData.indexOf(value)!=-1;
        /*
         * true:已存在
         * */
    }
};