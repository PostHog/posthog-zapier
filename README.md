# PostHog x Zapier

Make the best use of your data. Connect PostHog with *thousands* of services through Zapier.

## Using PostHog Cloud?

<!-- [Our official Zapier app](https://zapier.com/apps/posthog/) is there for you, no additional setup needed. -->
Our official Zapier app is coming soon!

## Using a self-hosted PostHog solution?

Not a problem. Create a private Zapier integration just for your instance with this package.  
It's only a few steps:

1. Clone or just download this repository.
2. Enter its directory with `cd`.
3. Install this project's dependencies.
    ```bash
    npm install
    ```
4. Update `API_HOST` value in `src/settings.ts`.
5. Globally install Zapier CLI.
    ```bash
    npm install -g zapier-platform-cli
    ```
6. Log into Zapier from the command line.
    ```bash
    zapier login
    ```
7. Either register a new integration on Zapier.
    ```bash
    zapier register "PostHog @ $YOUR_ORG"
    ```
    Or link to an existing one.
    ```bash
    zapier link
    ```
8. Push to Zapier.
    ```bash
    npm run push
    ```
9. Finish by filling integration details in the [Zapier Platform dashboard](https://zapier.com/app/developer), and don't forget to invite users!

## Questions?

### [Join our Slack community.](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ)

We're here to help you with anything PostHog!
