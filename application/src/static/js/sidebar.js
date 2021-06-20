$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

});

// For victims table --> Open link to victim
$(document).ready(function ($) {
    $('*[data-href]').on('click', function() {
        window.location = $(this).data("href");
    });
});