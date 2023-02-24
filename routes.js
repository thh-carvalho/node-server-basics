const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if(url === '/'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" placeholder="Message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    
    if(url === '/message' && method === 'POST'){
        const body = []
    
        //Buffer - It listen to all pacotes of a string that are sending for a file
        req.on('data', (chunck) => {
            body.push(chunck)
        })
    
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            const message = parseBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    
    //Creating HTML from Node
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My App</title></head>')
    res.write('<body><h1>My App</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = requestHandler