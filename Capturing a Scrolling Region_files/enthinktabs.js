if (!Enthink) var Enthink = {};
if (!Enthink.Tabs) Enthink.Tabs = {};
// Enthink.Tabs namespace
(function() {
  var ME = Enthink.Tabs;
  var Q = jQuery;
  ME.InitTabs = function (paneContentSelector,tabTextSelector,hide,ulClass,liClass,liActiveClass) {
    if(!paneContentSelector || !tabTextSelector)
        return false;
    // default css styles
    var _ulClass = (ulClass) ? ulClass : 'tabs';
    var _liClass = (liClass) ? liClass : 'tab';
    var _liActiveClass = (liActiveClass) ? liActiveClass : 'active-tab';
    
    // hide tab text source
    var _hide = (hide==true || hide==false) ? hide : true;
    
    // setup elements
    var _newTabs = Q('<ul></ul>');
    var _panes = Q(paneContentSelector);
    // pane content related
    _panes.each(function () {
        var header = Q(this).find(tabTextSelector);
        if(_hide) { header.hide(); }
        
        var title = header.text();
        if(title!=""){
            var tab = Q('<li />').text(title).addClass(_liClass).data('parent', this);
            tab.appendTo(_newTabs);
        }
    });
    // tab behaviour
    _newTabs.delegate('li.' + _liClass, 'click', function () {
        _panes.hide().filter(Q.data(this, 'parent')).show();
        Q(this).addClass(_liActiveClass).siblings().removeClass(_liActiveClass);
    });
    // initialize
    _panes.hide().first().before(_newTabs);
    _newTabs.addClass(_ulClass).children().first().click();  
  };
  
})();