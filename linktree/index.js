const Router = require('./router')

const linksArray =
    [
        { 'name': 'Personal Website', 'url': 'https://airloaf.github.io/' },
        { 'name': 'LinkedIn', 'url': 'https://www.linkedin.com/in/vikram-singh-ce/' },
        { 'name': 'GitHub', 'url': 'https://github.com/airloaf' }
    ];

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function links(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(linksArray)
    return new Response(body, init)
}

async function generatePage(request) {
    response = await fetch(
        'https://static-links-page.signalnerve.workers.dev',
        {
            headers: { 'content-type': 'text/html' }
        }
    )
    const linksPage = new HTMLRewriter().on("div#links", new LinksTransformer(linksArray)).transform(response);
    return linksPage
}

async function handleRequest(request) {
    const r = new Router()
    r.get('/links', request => links(request))
    r.get('/.*', request => generatePage(request))
    const resp = await r.route(request)
    return resp
}

class LinksTransformer {
    constructor(links) {
        this.links = links;
    }
    async element(element) {
        this.links.forEach(link =>{
            element.append(`<a href=\"${link.url}\">${link.name}</a>`, {html: true});
        })
    }
}