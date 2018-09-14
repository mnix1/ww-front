const originalFetch = fetch;
fetch = function (url, opts) {
    // console.log('fetch', url, opts);
    return originalFetch(url, {...opts, credentials: 'include'});
};

export default function request(url, data) {
    const opts = {};
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