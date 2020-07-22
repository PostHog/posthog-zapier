# posthog-zapier

These are what you normally do next:

```bash
# Install dependencies
yarn

# Run tests
zapier test

# Register the integration on Zapier if you haven't
zapier register "App Title"

# Or you can link to an existing integration on Zapier
zapier link

# Push it to Zapier
zapier push
```

In `package.json`, we've define some commonly-used scripts:

```bash
# Watch and compile as you edit code
yarn watch

# There's also a non-watch compile command
yarn build

# To push to Zapier, make sure you compile first
yarn build && zapier push
```
