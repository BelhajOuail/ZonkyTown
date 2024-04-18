var click_disabled = false;

$('.fave').click(function () {

    if (click_disabled) {
        return; // do nothing
    }

    $(this).toggleClass('faved');

    // Set correct aria-label 
    var label = $(this).attr('aria-label') == 'Favourite' ? 'Unfavourite' : 'Favourite';

    $(this).attr('aria-label', label);

    click_disabled = true;

    // Timeout value should match transition length
    setTimeout(function () {
        click_disabled = false;
    }, 1000);

});