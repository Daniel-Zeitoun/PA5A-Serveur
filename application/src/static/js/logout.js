'use strict';

(function () {

    window.addEventListener('load', function () {

        fetch('/api/auth/logout', {
            method: 'DELETE'
        })
            .finally(() => {
                const domain = new URL(document.baseURI)
                window.location = domain.origin
            })
    })
}())