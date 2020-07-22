# PostHog x Zapier

Make the best use of your data. Connect PostHog with *thousands* of services through Zapier.

## Using PostHog Cloud?

Use [our official Zapier app](https://zapier.com/apps/posthog/), no configuration needed.  

## Running a self-hosted PostHog solution?

Not a problem. Create a private Zapier integration just for your instance with this package.  
It's only a few steps:

1. Fork then clone or simply download this repository.

2. Enter its directory with `cd`.

3. Globally install Zapier CLI.

    ```bash
    npm install -g zapier-platform-cli
    ```

4. Log into Zapier from the command line.

    ```bash
    zapier login
    ```

5. Install package dependencies.

    ```bash
    npm install
    ```

6. Either register a new integration on Zapier.

    ```bash
    zapier register "PostHog @ $YOUR_ORG"
    ```
    Or link to an existing one.
    ```bash
    zapier link
    ```

7. Push to Zapier.

    ```bash
    npm run push
    ```

## Questions?

### [Join our Slack community.](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ)

We're here to make sure that you have a great time.
