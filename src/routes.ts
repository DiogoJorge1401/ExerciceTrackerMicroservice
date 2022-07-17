import { Router } from "express";
import { isValidURL } from './utils';

const routes = Router();

const shortenedURLS = [
  'https://forum.freecodecamp.org/'
]

routes.post("/shorturl", (req, res) => {
  try {
    const parsedURL = isValidURL(req.body.url)
    let short_url = shortenedURLS.findIndex(url => url === parsedURL)

    if (short_url === -1) {
      short_url = shortenedURLS.length
      shortenedURLS[short_url] = parsedURL
    }

    return res.json({
      original_url: parsedURL,
      short_url
    })

  } catch (error: any) {
    return res.json({ error: error.message })
  }
});

routes.get("/shorturl/:id", (req, res) => {
  const url = shortenedURLS[req.params.id]
  if (!url)
    return res.json({ error: "No short URL found for the given input" })
  return res.redirect(url)
});

export { routes };
