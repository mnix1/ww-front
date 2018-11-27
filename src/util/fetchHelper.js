// const originalFetch = fetch;
// fetch = function (url, opts) {
//     // console.log('fetch', url, opts);
//     return originalFetch(url, {...opts, credentials: 'include'});
// };

export function csrf() {
    try {
        const token = document.getElementsByName('_csrf')[0].getAttribute('content');
        const header = document.getElementsByName('_csrf_header')[0].getAttribute('content');
        return {header, token};
    } catch (e) {
        return {};
    }
}

export default function request(url, data) {
    const securityCsrf = csrf();
    const opts = {[securityCsrf.header]: securityCsrf.token};
    if (data) {
        opts.body = JSON.stringify(data);
        opts.method = 'POST';
        opts.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }
    return fetch(url, opts)
        .then(res => res.json())
        .catch(e => {
            console.error(e);
        })
}