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

function csrfToHeaders() {
    const securityCsrf = csrf();
    if (!securityCsrf.token) {
        return {};
    }
    return {[securityCsrf.header]: securityCsrf.token};
}

export default function request(url, data) {
    const opts = {headers: csrfToHeaders()};
    if (data) {
        opts.body = JSON.stringify(data);
        opts.method = 'POST';
        opts.headers = {
            ...opts.headers, ...{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
    }
    return fetch(url, opts)
        .then(res => res.json())
        .catch(e => {
            console.error(e);
        })
}

export function requestForm(url, data) {
    const opts = {};
    opts.body = data;
    opts.method = 'POST';
    opts.headers = csrfToHeaders();
    return fetch(url, opts);
}