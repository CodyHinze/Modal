function setPlatform( platform, dontFilter )    // platform should be set to "mac" or "win" only! Any other value will default to "win"
{
    if( platform != "mac" )
        platform = "win";
    $.cookie( "platform_preference", platform, { path: '/' } );
    if( dontFilter != true )
        filterPlatformContent( );
}
function clearPlatformPreference( )
{
    $.cookie( "platform_preference", "", { path: '/' } );
}
function getPlatform( )
{
    var platform = $.cookie( 'platform_preference' );
    if( platform != "mac" && platform != "win" )
    {
        var os = $.client.os.toLowerCase();
        platform = "win";
        if( os == "mac" )
            platform = "mac"
        setPlatform( platform, true );
    }
    return platform;
}
function filterPlatformContent( )
{
    var platformHasContent = false;
    var otherPlatformHasContent = false;
    if( getPlatform( ) == "win" ) {
        $( '.platform-filter-win' ).each( function( ) {
            $(this).show( );
            platformHasContent = true;
        });
        if( platformHasContent ) {    // Do not hide "other platform" content if the selected platform has no specific content
            $( '.platform-filter-mac' ).each( function( ) {
                $(this).hide( );
                otherPlatformHasContent = true;
            });
            $( '#platform-switcher a' ).text( "Mac Version" ).click( function() { setPlatform( "mac" ); redirectPlatformMain( );});
        }
    } else {
        $( '.platform-filter-mac' ).each( function( ) {
            $(this).show( );
            platformHasContent = true;
        });
        if( platformHasContent ) {    // Do not hide "other platform" content if the selected platform has no specific content
            $( '.platform-filter-win' ).each( function( ) {
                $(this).hide( );
                otherPlatformHasContent = true;
            });
            $( '#platform-switcher a' ).text( "Windows Version" ).click( function() { setPlatform( "win" ); redirectPlatformMain( );});
        }
    }
    if( !platformHasContent || !otherPlatformHasContent )    // Hide platform switch if there is no content to filter.
        $( '#platform-switcher' ).css( "visibility", "hidden" );
}
jQuery(document).ready(function($) {
    if( cmsRenderMode != "1" )
    {
        $( '#platform-switcher' ).css( "visibility", "visible" );
        filterPlatformContent( );

        //Setting the platform for all CS and CS_MAC link items 
        $('ul.mmitem > li > a.switch-platform-mac').parents('ul.mmitem')
                                                   .find('li > a') 
                                                   .addClass('switch-platform-mac');
        $('ul.mmitem > li > a.switch-platform-win').parents('ul.mmitem')
                                                   .find('li > a')
                                                   .addClass('switch-platform-win');

        // Any anchor which has one of these switch-platform classes will automatically switch the platform when clicked (linking behaviour unlatered).
        $( 'a.switch-platform-mac' ).click( function() {
            setPlatform( "mac" ); 
            return true; 
            try {redirectPlatformMain( )} catch(redirectError){};
        });
        $( 'a.switch-platform-win' ).click( function() { 
            setPlatform( "win" ); 
            return true; 
            try {redirectPlatformMain( )} catch(redirectError){};
        });
    }
});