const Router = require('./router')

const linksArray =
    [
        { 'name': 'Personal Website', 'url': 'https://airloaf.github.io/' },
        { 'name': 'LinkedIn', 'url': 'https://www.linkedin.com/in/vikram-singh-ce/' },
        { 'name': 'GitHub', 'url': 'https://github.com/airloaf' }
    ];

const name = "Vikram Singh"
const profileImageURL = "https://avatars2.githubusercontent.com/u/13282682?s=460&u=a5689107f5785c9a98338b7624bfe0cb8bf3c279&v=4"

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
    const profilePage = new HTMLRewriter().on("div#profile", new ProfileTransformer()).transform(linksPage);
    const namePage = new HTMLRewriter().on("h1#name", new NameTransformer(name)).transform(profilePage);
    const avatarPage = new HTMLRewriter().on("img#avatar", new AvatarTransformer(profileImageURL)).transform(namePage);
    return avatarPage; 
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

class ProfileTransformer {
    async element(element) {
        // the style attribute contains "display: none"
        element.removeAttribute('style');
    }
}

class NameTransformer{
    constructor(name){
        this.name = name;
    }
    async element(element) {
        element.append(this.name);
    }
}

class AvatarTransformer{
    constructor(imageURL){
        this.imageURL = imageURL;
    }
    async element(element) {
        element.setAttribute('src', this.imageURL);
    }
}