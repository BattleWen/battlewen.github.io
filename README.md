# Xiaoyu Wen Homepage

Personal academic homepage built with Jekyll.

## Local Preview

Run the site locally:

```bash
cd /Users/battlewen/Homepage/battlewen.github.io
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
bundle _2.2.22_ exec jekyll serve --livereload --host 127.0.0.1 --port 4000
```

Then open:

```text
http://127.0.0.1:4000
```

## Main Files

- `_pages/about.md`: homepage content
- `_config.yml`: site title, profile, links, avatar
- `_data/navigation.yml`: top navigation
- `images/`: avatar, publication figures, favicon assets
- `run_server.sh`: simple local start script

## Update Content

Edit `_pages/about.md` to update:

- About Me
- News
- Selected Publications
- Educations
- Internships
- Academic Services

Edit `_config.yml` to update:

- name
- description
- email
- Google Scholar
- GitHub
- avatar

## Build

To build the static site without serving:

```bash
cd /Users/battlewen/Homepage/battlewen.github.io
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
bundle _2.2.22_ exec jekyll build
```

The generated files will be written to `_site/`.
