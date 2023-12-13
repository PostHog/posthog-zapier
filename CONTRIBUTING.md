# Developing `posthog-zapier`

Here's how to push a version of `posthog-zapier` without CI:

1. Clone or download this repository.
1. Enter its directory with `cd`.
1. Install Node modules.
    ```bash
    npm install
    ```
1. Globally install Zapier CLI.
    ```bash
    npm install -g zapier-platform-cli
    ```
1. Log into Zapier from the command line. If you're a PostHog team member, make sure you're part of the PostHog org there.
    ```bash
    zapier login
    ```
1. Either register a new integration on Zapier.
    Or link to an existing one.
    ```bash
    zapier link
    ```
1. Push to Zapier.
    ```bash
    npm run push
    ```
1. Finish by filling in integration details in the [Zapier Platform dashboard](https://zapier.com/app/developer). If updating an existing integration, deprecate the old version and migrate users to the new one.s
