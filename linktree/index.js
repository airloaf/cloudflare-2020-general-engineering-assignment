const Router = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function links(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(
                [
                    { 'name': 'Personal Website', 'url': 'https://airloaf.github.io/' },
                    { 'name': 'LinkedIn', 'url': 'https://www.linkedin.com/in/vikram-singh-ce/' },
                    { 'name': 'GitHub', 'url': 'https://github.com/airloaf' }
                ]
    )
    return new Response(body, init)
}

async function handleRequest(request) {
    const r = new Router()
    // Replace with the appropriate paths and handlers
    r.get('/links', request => links(request))

    const resp = await r.route(request)
    return resp
}
