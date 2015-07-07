var args = arguments[0] || {};

var _layout = {};
var _titles = [];
//var current = 0;
var contentOffset = 0,
leftOffset = 0,
current = {};
current.index = 0;
current.width = 100;
_layout.autoIndex = 0;

// changing background color of header menu
$.header.backgroundColor = args.backgroundColor;

// /**
//    * Add the views to the scroll panel
//    */
  _layout.addViews = function(){

    // add children if there are any
    _.each(args.children || [], function(child) {
      var tab = {};
      if (typeof child.title != "undefined") tab.title = child.title;
      if (typeof child.tabWidth != "undefined") tab.tabWidth = child.tabWidth;
     // if (typeof child.icon!="undefined") icon=child.icon;
      $.slideCollector.add(child);
      _titles.push(tab);

    });

    setTimeout(function(){
       _layout.configureTabs();
    },500);
  
  
  };

  _layout.addViews();

  /**
   * Adding the tab Labels
   */
  _layout.configureTabs = function(){
    _.each(_titles , function(tab){

      // jumper.log(tab.title);
      // jumper.log(tab.tabWidth);
     
      var buttonView;
      var position = $.scrollView.children.length;

      var _label = Ti.UI.createLabel({
          
          text: tab.title , 
          height:'100%'
        });

      _label.title= tab.title;
      _label.indexPosition = position;
      _label.addEventListener('click', function(e){
        _layout.navigateTo(e);
      });

      $.addClass(_label, "l-5 fs12 r-10");
      $.addClass(_label, "w-"+tab.tabWidth);
      $.scrollView.add(_label);
      _label = null;
      
    });


  };




_layout.navigateTo = function(e){
  
 var index = e.source.indexPosition;
 if (typeof index=="undefined") index=0;
 //jumper.log(index);


  //jumper.log("current index : "+current.index+" : width : "+current.width);
   var slides        = $.slideCollector.children;
   _layout.tabs     = $.scrollView.children;
  //jumper.log("current index : "+current.index);


  // jumper.log("current index "+current.index+" Index "+index);

  slides[current.index].animate({
     left:"-100%",
      duration: 250
  });
  
  slides[index].animate({
     left:"0",
       duration: 250
  });



  leftOffset = 0;
  current.index = index;
  current.width =  _layout.tabs[current.index].getWidth();
  var howFar = _layout.beforeMe( current.index );

  if( howFar > Titanium.Platform.displayCaps.platformWidth /2 ){
      $.scrollView.scrollTo( howFar / 2 , 0);
   }

   setTimeout(function(){
     _layout.rePositionIndicator();
   }, 300);
 

}

_layout.swipeTabPage = function(){


 
}

_layout.initIndicator = function(){
    _.each($.scrollView.children, function(child, index) {

      child.addEventListener('click', function(e) {
        $.indicator.show();

        leftOffset = 0;
        current.index = index;
        current.width = child.getWidth();
        _layout.rePositionIndicator();

      });

  });
}



_layout.rePositionIndicator = function() {
  var _left = _layout.beforeMe(current.index);
 // var _msg = "content offset "+contentOffset+" actual left "+_left;
  _left = _left - contentOffset;
  // _msg  += " Left : "+_left+" index : "+current.index+": width "+current.width;
  // alert(_msg);

  setTimeout(function() {
    $.indicator.animate({
      left: _left,
      width: current.width
    });
  }, 100);
}


_layout.beforeMe = function(index) {

 
  var before = _layout.tabs.slice(0, index);

  // jumper.log(before);
  // jumper.log("before length "+before.length);

  leftOffset = 0;
  _.each(before, function(item) {
    var temp = item.getWidth();
    temp = parseInt(temp.replace('dp', ''));
    leftOffset += temp + 15;
  });

  return leftOffset;
}

_layout.autoChangePage = function(e, opt){
  var _opt = {
      autoScroll:false
  }

  _opt = _.extend(_opt, opt);

   _layout.tabs    = $.scrollView.children;
  

    if(e.direction == "right") {
      _layout.autoIndex--;
    } else if(e.direction == "left") {
      _layout.autoIndex++;
    }

   if(_layout.autoIndex < 0 ){
      _layout.autoIndex++;
      return;
   }else if( _layout.autoIndex > (_layout.tabs.length - 1 ) ) {
      _layout.autoIndex--;
      return;
   }

   if( _layout.autoIndex % 2 == 0){
      $.scrollView.scrollTo( _layout.beforeMe( _layout.autoIndex ) / 2 , 0);
   }

   setTimeout(function(){
       _layout.tabs[_layout.autoIndex].fireEvent('click'); 
   }, 300);
   
 
  
  
}

$.scrollView.addEventListener('scroll', function(e) {
  contentOffset = $.scrollView.contentOffset.x;


  if (contentOffset < 0) {
    contentOffset = 0;
  }
 
 // jumper.log("scroll content offset "+contentOffset);

});

$.scrollView.addEventListener('dragend', function(e) {
  //contentOffset = $.scrollView.contentOffset.x;
   //jumper.log("drag end content offset "+contentOffset);
  _layout.rePositionIndicator ();

    
});

$.scrollView.addEventListener('scrollend', function(e) {
  _layout.rePositionIndicator ();
});

$.slideCollector.addEventListener('swipe', function(e){
  e.cancelBubble = true;

  _layout.autoChangePage(e, {autoScroll:true});
  
});