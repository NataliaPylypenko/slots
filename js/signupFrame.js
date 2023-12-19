document.getElementById('getBonus').addEventListener('click', function() {
    window.iframeSignup.contentWindow.postMessage('action:open_login', '*');
});

window.onmessage = function(event) {
    let ui = event.data;

    if (typeof ui === 'object') {
        ui = event.data.name;
    }

    switch (ui) {
        case "ui:confirm_signup":
            const token = event.data.token;
            document.location.href = `https://preprod.justbit.io?land_token=${token}`;
            break;
        case "ui:open_login":
            document.location.href = 'https://preprod.justbit.io/#login';
            break;
    }
};