/* --- Foundation Page RedDot Menu --- */
function toggleFDRM(subMenu) {
    var subDivs = document.getElementById(subMenu).getElementsByTagName('div');
    var divImg = subDivs[0].getElementsByTagName('img');
                
    if (subDivs[1].style.display == "block") {
        subDivs[1].style.display = "none";
        divImg[0].src = "<%img_widget_plus%>";
    }
    else {
        subDivs[1].style.display = "block";
        divImg[0].src = "<%img_widget_minus%>";
    }
}
/* --- End --- */
jQuery(document).ready(function($) {
    megaMenuSetup();
    carouselSetup();
    setDistCodeCookie();
    setPassThroughLinks();
    sizeVideoPlayers();    
    setModalOpeners();
});
/* --- Start Modal One Video Player Template --- */
var currentModal;
function sizeVideoPlayers() {  
    //Size Video Player HTML5 For Modal
    $('.modal-data>div>video').attr({
        'width': '800',
        'height': '450'
    });
    //Size Video Player HTML5 For Top Hero
    $(".top-hero>.video-player>video").attr({
        'width': '768',
        'height': '432'
    });
    //Size Video Player HTML5 For Center Content
    $(".content-left>.video-player>video").attr({
        'width': '560',
        'height': '315'
    });    
}
function setModalOpeners() { 
    var anchorID;   
    //Find IMAGES that have modal anchors in DOM
    var links = $('a img.play-in-modal').parent();   
    //Write out Modal Play Button over image
    $(links).each(function() {
        // ---- Add onclick function to display modal ----
        var anchor = $(this).attr('href');
        //Pull ID String from Anchor String
        anchorID = (anchor).split('#');
        anchorID = (anchorID[1]);
        //Create Onclick Function
           $(this).click(function() {
            openModal(anchorID);
        });    
        //Remove Anchor #ID link
        //Write Modal Overlay Play Button Containers to DOM
        $(this).prepend("<span class='play-overlay'></span>");
        var modalCode = getModalCode(anchorID);
        $(this).after(modalCode);
        //Add Functionality to Close Button and Overlay for Image Modal Links
        closeModalActions (anchorID);
    });
    //Find TEXT links to modal in DOM
    var textLinks = $('span.link-to-modal').parent('p');
    $(textLinks).each(function() {
        var textModal = $(this).next('div.modal-data');
        var modalName = $(textModal).attr('id');
        //Get ID Numeric String
        anchorID = (modalName).split('modal-data-');
        anchorID = (anchorID[1]);
        //Write Modal Container
       var modalCode = getModalCode(anchorID);
        $(this).after(modalCode);
        //Change Span to Anchor for Text Links
        var textAnchor = $(this).children('span.link-to-modal');
        var anchorNum = (anchorID);
        $(textAnchor).html("<a href='javascript:void(0)' class=''>" + $(textAnchor).text() + "</a>");
        $(this).click(function() {
            openModal(anchorNum);
        });    
        //Add Functionality to Close Button and Overlay for Text Modal Links
        closeModalActions (anchorID);
    });
    //Find HERO Text links to modal
    var heroLinks = $('.hero-link');
    $(heroLinks).each(function() {
        var textModal = $(this).next('div.modal-data');
        var modalName = $(textModal).attr('id');
        //Get ID Numeric String
        anchorID = (modalName).split('modal-data-');
        anchorID = (anchorID[1]);
        //Write Modal Container
        var modalCode = getModalCode(anchorID);
        $(this).after(modalCode);
        //Change Span to Anchor for Text Links
        var textAnchor = $(this).find('a.hero-link-to-modal');        
        $(textAnchor).attr('href','javascript:void(0)');
        $(textAnchor).click(function() {
            openModal(anchorID);
        });    
        //Add Functionality to Close Button and Overlay for Text Modal Links
        closeModalActions (anchorID);
    });
}
function getModalCode(anchorID) {
    //Inline Style tags need removed and migrated to structure.css after old template removed
    var modalCode = "<div id='modal-" + anchorID + "' class='modal-overlay' style='display:none;'><div id='overlay-" + anchorID + "' class='overlay' style='display:block;'></div><div id='close-" + anchorID + "' class='overlay-close' style='display:block;'></div><div id='overlay-content-" + anchorID + "' class='overlay-content' style='display:block;'><div id='video-holder-" + anchorID + "'></div></div></div>";
    
    return modalCode;
}
function openModal(modalID) { 
    //set current Modal variable for passing ID string
    currentModal = (modalID);
    //Place contents of modal from Modal-Data div
    var holder = $('#video-holder-' + modalID);
    var modalContent = $('#modal-data-' + modalID).html();
    //Set Autoplay for Flash Player (if available)
    modalContent=modalContent.replace("autoplay=false","autoplay=true");
    //Check for empty Modal Data Div
    if (modalContent.length > 5) {
        try {$(holder).html(modalContent);}
        catch (err){}
    //Autoplay HTML5 Video (if available)
    $('#video-holder-' + modalID + ' video').attr('autoplay','true'); 
    //Set Modal Size
    sizeModal(modalID);
    //Display Modal
    $('#modal-' + modalID).css('display', 'block');
    //Disable scroll bars on background
    $('body').css('overflow','hidden');
    }
}
function sizeModal(modalID) { 
    //Default Modal size and position
    var modalWidth = 800; //Videos
    var modalHeight = 450;
    var modalMargin = 20;
    var modalBorder = 8;
    var textModalWidth = 600; //Additional Content Text Area Width
    var modalTop = 120;
    var closeOffsetLeft = -8;
    var closeOffsetTop = -23;
    var marginHorizontalMinimum = 20;
    var marginVerticalMinimum = 100;
        
    //Window Sizes
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    //Calculations
    var modalLeft = ((windowWidth-modalWidth-modalMargin)/2)+'px';
    var closeLeft = ((windowWidth-modalWidth)/2 + (modalWidth) + (closeOffsetLeft)) + 'px';
    if (windowWidth-modalWidth+modalMargin+(modalBorder*2) <= 0) { //764
        //console.log ('Window is narrower than content');
        var closeLeft = (modalWidth + modalMargin + closeOffsetLeft) + 'px';
    }
    //Log Modal Left position (document width minus modal width / 2
        //console.log  ('modal left position:' + modalLeft);
    //Log window/document sizes and file to be loaded
        //console.log ('window width: ' + $(window).width() +'   window height: ' + $(window).height() + '   document height: ' + $(document).height() );
        //console.log ('modalWidth: ' + modalWidth + ' modalCloseOffset: ' + closeLeft);
    // Overlay background
    $('#overlay-' + modalID).css('height', ($(document).height())+'px');
        
    //Test for type of Modal - Text or Video
    var modalContent = $('#modal-data-' + modalID).html();
    var modalType = "video";
    if( modalContent.indexOf( "user-content" ) !== -1 ){
        modalType = "text";
        //Set variables to Text Modal Defaults
        modalWidth = textModalWidth;
        modalHeight = (windowHeight - modalTop - (marginVerticalMinimum*2))
        modalLeft = ((windowWidth-textModalWidth-modalMargin)/2)+'px';
        closeLeft = ((windowWidth-textModalWidth)/2 + (textModalWidth) + (closeOffsetLeft)) + 'px';
        //Calculate height of Modal Contents.
        var modalContentsHeight = $('#overlay-content-' + modalID +' .user-content').height();
    }
    //Log Modal Type
        //console.log('Modal Type: ' + modalType);
        
    //Style and Position Modal based on type
        //Size
        $('#overlay-' + modalID).css('height', ($(document).height())+'px');
        $('#overlay-content-' + modalID).css({'max-height':(modalHeight),'width':(modalWidth)});

        //Adjust modal content (If Text Area) to fit modal height
        if( modalType == "text" ){
            var modalContentPadding = $('#overlay-content-' + modalID + ' .user-content').css('padding-top').replace("px", "");
            $('#overlay-content-' + modalID + ' .user-content').css({'max-height':(modalHeight - (modalContentPadding * 2))});
        }
        
        //Position
        $('#overlay-content-' + modalID).css({'top':(modalTop+"px"),'left':(modalLeft)});
        $('#close-' + modalID).css({'top':(modalTop + closeOffsetTop)+'px','left':(closeLeft)})
        //Check for window Narrower than Modal
        if ( windowWidth <= ( modalWidth + (marginHorizontalMinimum*2)) ) {
            //console.log('Window too small to display full modal -- Minimum Margin Left: ' + marginHorizontalMinimum + ' Window: '+ windowWidth + ' Modal:' + modalWidth)
            //Position
            $('#overlay-content-' + modalID).css({'top':(modalTop+"px"),'left':(marginHorizontalMinimum)});
            $('#close-' + modalID).css({'top':(modalTop + closeOffsetTop)+'px','left':( modalWidth + marginHorizontalMinimum + modalBorder + closeOffsetLeft )});
        }
}
$(window).resize(function() {
    if (currentModal != "") {
        sizeModal(currentModal);
    }
});
function overlayButtons(){   
    //Place overlay image for play button
    var spanOverlay = $('span.play-overlay').next('img.play-in-modal');
    $(spanOverlay).each(function() {
        var imageWidth = $(this).width();
        var imageHeight = $(this).height();
        // console.log ('image width: ' + imageWidth + '    image height: ' + imageHeight);
        $(this).prev('span.play-overlay').css('width', imageWidth + 'px');
        $(this).prev('span.play-overlay').css('height', imageHeight + 'px');
    });
}
function closeModalActions (anchorID) {
    $('#close-' + anchorID).click(function() {
        closeModal(anchorID);
    });    
    $('#overlay-' + anchorID).click(function() {
        closeModal(anchorID);
    });    
}
function closeModal(num){
    //Enable scrollbars on background
    $('body').css('overflow','auto');
    //Reset Current Modal variable
    currentModal = "";
    //console.log ('Trying to close modal: ' + num);
    //Stop HTML5 Player (Remove Iframe)
    var iframeToNuke = $('#video-holder-' + num).find('iframe')[0];
    if (iframeToNuke) {
           $(this).attr("src","");
    }
    //Hide Modal
    $('#modal-' + num).css('display','none');
    //Remove player
    $('#video-holder-' + num).html('');
}
/* --- End Modal One Video Player Template --- */
function setPassThroughLinks() {
   links = $("a span.passThroughLink, a img.passThroughLink").parent();   
   
   var vars = {};
   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
   });
   for (i = 0; i < links.length; i++) {  
      var linkChar = "?";
      if (  links[i].href.indexOf("?") != -1 ) {
         linkChar = "&";
      }
      for (key in vars) {
         links[i].href += linkChar + key + "=" + vars[key];
         linkChar = "&";
      }
   }
}
function setDistCodeCookie() {
    var distCode = getQueryStringVars()["cmp"];
    if (distCode) {
        var cookieDomainParts = window.location.host.split('.');
        var cookieDomain = '.' + cookieDomainParts[(cookieDomainParts.length - 2)] + '.' + cookieDomainParts[(cookieDomainParts.length - 1)];
        $.cookie("DistCode", distCode, {path: '/', domain: cookieDomain});
    }
}
function getQueryStringVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key.toLowerCase()] = value;
    });
    return vars;
}
function megaMenuSetup() {
    $('.header_menu ul li.megamenu a').click(function(e){
        e.preventDefault();
        $('#megamenu').stop('true', 'true').slideToggle('slow'); 
        $('.header_menu ul li.megamenu').toggleClass( 'active' );
    });
}
function carouselSetup() {
        //Image Banner Rotator
        //Setting up the var's
        var onscreendelay = 5000;  // How long the image stays onscreen for.
        var fadein        = 1000;  // How long the image takes to fade in.
        var clicked_delay = 10000; // How long the system waits after a dot was clicked before it startes the timmer again.
        var scroll_loop   = 10000; // How long the timmer waits before its starts the next loop
        var i             = 1;     // Var for the current count in the system.
        
        // Add the UL structor to the page
        $('.carousel-item-count .item-holder').append('<ul></ul><div class="clr"></div>');
        
        //Fill the UL with an LI for each image present 
        var countz = 0;
        $('.carousel .carousel-item').each(function () {
             if(countz == 0){
                 $('.carousel-item-count .item-holder ul').append('<li class="active">&bull;</li>');
                 countz++;
                 }
             else {
                   $('.carousel-item-count .item-holder ul').append('<li>&bull;</li>');
             }
       })
        
        
        //The rotating function
        function scrollimg() {
            $('.carousel .carousel-item:visible').stop(true, true).fadeOut('slow',function(){
                        $('.carousel .carousel-item').eq(i-1).stop(true, true).fadeIn(fadein);
                        $('.carousel-item-count .item-holder ul li.active').removeClass('active');
                        $('.carousel-item-count .item-holder ul li').eq(i-1).addClass('active');
                    });            
            if (++i > $('.carousel .carousel-item').size()) i = 1;
            
        };
        
        // The DOTS click function
        $('.carousel-item-count .item-holder ul li').click(function(){
                                            
            //remove the active class from the li of the currently active 
            $('.carousel-item-count .item-holder ul li.active').removeClass('active');
            $('.carousel-item-count .item-holder ul li').eq($('.carousel-item-count .item-holder ul li').index(this)).addClass('active');
            //set the var for what num was clicked
            var clicked = $('.carousel-item-count .item-holder ul li').index(this);
            //Stop the scroller from running ny more loops
            clearInterval(scroll_img);
            
            //fade the current image away
            $('.carousel .carousel-item:visible').stop(true, true).fadeOut('fast', function(){
                
                //Set the var i to be the next image in the set
                i = clicked + 1;
                
                //fade in the clicked dot's corasponding image and start the timer after a set amount of time.
                $('.carousel .carousel-item').eq(clicked).fadeIn('slow').delay(3000,doscroll());
                function doscroll(){
                scroll_img = setInterval(scrollimg, scroll_loop)
                }                                                
            });
            
       });
        //start the rotator
        scroll_img = setInterval(scrollimg, scroll_loop);
}
 
function popupdiv(num){
    //var pageDivs = new Array('header', 'topNav', 'navHeader', 'navigation','flashArea', 'footerWrapper');
    //for (var aa = 0; aa < pageDivs.length; aa++) {
    //document.getElementById(pageDivs[aa]).style.opacity = val/100;
    //document.getElementById(pageDivs[aa]).style.filter = 'alpha(opacity='    +val+ ')';
    //document.getElementById(pageDivs[aa]).style.MozOpacity = val/100;
    //}
    
    var val = 50;
    var x,y;
    try {
    /*if (self.innerHeight) { // all except Explorer
    x = self.innerWidth;
    y = self.innerHeight;
    }
    else if (document.documentElement &&
    document.documentElement.clientHeight)
    // Explorer 6 Strict Mode
    {
    x = document.documentElement.clientWidth;
    y = document.documentElement.clientHeight;
    }
    else if (document.body) // other Explorers
    {
    x = document.body.clientWidth;
    y = document.body.clientHeight;
    }*/
    if( window.innerHeight && window.scrollMaxY ) { // Firefox
    pageWidth = window.innerWidth + window.scrollMaxX;
    pageHeight = window.innerHeight + window.scrollMaxY;
    }
    else if( document.body.scrollHeight > document.body.offsetHeight ) { //    all but Explorer Mac
    pageWidth = document.body.scrollWidth;
    pageHeight = document.body.scrollHeight;
    }
    else { // works in Explorer 6 Strict, Mozilla (not FF) and Safari
    pageWidth = document.body.offsetWidth + document.body.offsetLeft;
    pageHeight = document.body.offsetHeight + document.body.offsetTop;
    }
    //alert("Page Height: " + pageHeight + "\nOffset: " + document.body.offsetHeight);
    //Create Close Button Div 
    var closeHolder = document.createElement('div');
    closeHolder.id = 'close' + num;
    closeHolder.className = 'overlay-close';
    closeHolder.innerHTML = '<span>Close X</span>';
    var closeParent = document.getElementById('overlay-content' + num);
    closeParent.parentNode.insertBefore(closeHolder, document.getElementById('overlay-content' + num));
    //Set click attribute on close button
    var closeAction = "closeoverlay('"+ num +"');";
    var clickClose = new Function(closeAction);
    var closeBtn = '#close' + num;
    $(closeBtn).click(clickClose); 
   
    //Set the position for the hover box
    //var yy = document.body.offsetHeight /2;
    //var posy = yy - 200;
    var xx = document.body.offsetWidth / 2;
    var posx = xx - 390;
    document.getElementById('overlay' + num).style.height = pageHeight + "px";
    document.getElementById('overlay-content' + num).style.height = "450px";
    document.getElementById('overlay-content' + num).style.left = posx+"px";
    document.getElementById('overlay-content' + num).style.top = "110px";
    document.getElementById('close' + num).style.top = "92px";
    document.getElementById('close' + num).style.left = (posx+740) + "px";
    document.getElementById('close' + num).style.display = "block";
    } catch(e) {}
    //alert(document.getElementById('wrapper').style.height);
    //alert(document.body.offsetHeight);
    document.getElementById('overlay' + num).style.display = "block";
    document.getElementById('overlay' + num).style.opacity = val/100;
    document.getElementById('overlay' + num).style.filter = 'alpha(opacity=' +val+ ')';
    document.getElementById('overlay' + num).style.MozOpacity = val/100;
    document.getElementById('overlay-content' + num).style.display = "block";
}
function closeoverlay(num){
        document.getElementById('overlay-content' + num).innerHTML = "";
        document.getElementById('overlay-content' + num).style.display = "none";
        document.getElementById('overlay' + num).style.display = "none";
        var closeHolder = document.getElementById('close' + num);
        closeHolder.parentNode.removeChild(closeHolder);    
}
function cleartxt(element) {
    var checker = element.value;
    if(checker == "<%opt_HeaderSearchDefaultText%>"){
        element.value = "";
    }
}
function replacetxt(element) {
    var checker = element.value;
    if(checker == ""){
        element.value = "<%opt_HeaderSearchDefaultText%>";
    }
}
// For switching the site lang
function dropdownRedirect(dropdown)
{
    var myindex  = dropdown.selectedIndex
    window.location.href = dropdown.options[myindex].value;
    return true;
}
function fixOrderedListElement( elem )
{
    var tmpContent = $(elem).html();
    $(elem).empty();
    $(elem).html('&nbsp;<span>' + tmpContent + '</span>');
}
$(document).ready(function() {
        
            $('body').removeClass('no-js'); // Allows for controlled styles if JS is disabled or broken.
            $('ol.blue li').each(function() { fixOrderedListElement( this ); });
            $('ol.black li').each(function() { fixOrderedListElement( this ); });
            $('ol.blue ol li').each(function() { fixOrderedListElement( this ); });
            $('ol.black ol li').each(function() { fixOrderedListElement( this ); });
            $('ol.blue').each(function() { $(this).removeClass('blue').addClass( 'blue-bullets' ); });
            $('ol.black').each(function() { $(this).removeClass('black').addClass( 'black-bullets' ); });
            <%opt_LanguageDropDownSelect%>
        });
$(window).load(function(){
    overlayButtons(); //Play button overlays for Modal Video image anchors
});
 
