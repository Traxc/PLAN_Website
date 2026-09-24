# Applied Research Practicum website prototype

A responsive, single-page HTML/CSS/JavaScript prototype with a small PHP contact-form adapter.

## Run locally

You need PHP 8 or newer. In the VS Code terminal, from this folder, run:

```bash
php -S localhost:8000
```

Then visit `http://localhost:8000`.

Opening `index.html` directly is fine for viewing the design, but the contact form needs the PHP server command above.

## Content to replace

- Phone number: search for `(317) 555-0100` and `+13175550100` in `index.html`.
- Email address: search for `arp@example.edu`.
- IU logo: replace `.brand__mark` spans with an approved image or SVG, then update the related CSS.
- Team details: replace the placeholder names, roles, biographies, and portrait blocks.
- Intro and mission copy: replace the marked placeholder text.
- Form disclaimer: have the clinic approve the final wording before launch.

## Connect the external form

The current prototype validates the form but stores no submissions. When the external form is available:

1. Identify its POST endpoint, authentication requirements, and exact field names.
2. Update the payload mapping near `EXTERNAL FORM ADAPTER` in `contact.php`.
3. Set the server environment variable `ARP_FORM_ENDPOINT` to the external endpoint.
4. Test with non-sensitive sample data before launch.

Some form providers block server-to-server submissions, require API keys, or prohibit proxying. In that case, the same UI can be connected to an email service, serverless function, or a lightweight database/API later.

## Deployment note

GitHub Pages cannot run PHP. A conventional managed host with PHP support (or a static host plus a serverless form handler) will be a better fit. The domain can be pointed to the chosen host using its DNS instructions. Keep API keys and endpoint secrets in host environment variables, never in these files.
