#!/bin/bash

# Function to create directory structure
create_dirs() {
    mkdir -p "${project_name}/_includes"
    mkdir -p "${project_name}/_layouts"
    mkdir -p "${project_name}/_posts"
    mkdir -p "${project_name}/.github/workflows"
    mkdir -p "${project_name}/_automation"
}

# Function to create config files
create_config_files() {
    # _config.yml
    cat <<EOF > "${project_name}/_config.yml"
title: "${project_name}"
description: "Automated blog combining tech, finance, and lifestyle content"
url: "https://${hvenkatraman}.github.io/${project_name}"
plugins:
  - jekyll-sitemap
  - jekyll-seo-tag

defaults:
  - scope:
      path: ""
    values:
      image: /assets/images/social-share-default.jpg
EOF

    # GitHub Actions workflow
    cat <<EOF > "${project_name}/.github/workflows/update.yml"
name: Auto-Update Content
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.x'
      - name: Install dependencies
        run: pip install requests
      - name: Fetch News
        env:
          NEWS_API_KEY: \${{ secrets.NEWS_API_KEY }}
        run: python _automation/news_fetcher.py
      - name: Commit Changes
        run: |
          git config --global user.name "GitHub Actions"
          git config --global user.email "actions@github.com"
          git add .
          git commit -m "Auto-update: New posts added"
          git push
EOF
}

# Function to create automation script
create_automation_script() {
    cat <<EOF > "${project_name}/_automation/news_fetcher.py"
import requests
import os
from datetime import datetime

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
TOPICS = ["technology", "personal finance", "productivity", "food"]

def fetch_news():
    for topic in TOPICS:
        response = requests.get(
            f"https://newsapi.org/v2/everything?q={topic}&sortBy=popularity&apiKey={NEWS_API_KEY}"
        )
        articles = response.json().get('articles', [])[:2]
        for article in articles:
            create_post(article, topic)

def create_post(article, category):
    date = datetime.now().strftime("%Y-%m-%d")
    filename = f"_posts/{date}-{article['title'][:50].replace(' ', '-').lower()}.md"
    
    content = f"""---
layout: post
title: "{article['title']}"
date: {date}
categories: {category}
---

{article['content'] or article['description']}

[Read more at {article['source']['name']}]({article['url']})

{% include affiliate-disclaimer.md %}
"""
    with open(filename, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    fetch_news()
EOF
}

# Function to create template files
create_template_files() {
    # Affiliate disclaimer
    cat <<EOF > "${project_name}/_includes/affiliate-disclaimer.md"
*Disclosure: This post may contain affiliate links. If you make a purchase, I may earn a commission at no extra cost to you.*
EOF

    # Ad template
    cat <<EOF > "${project_name}/_includes/ads.html"
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX"
     crossorigin="anonymous"></script>
EOF

    # Post layout
    cat <<EOF > "${project_name}/_layouts/post.html"
---
layout: default
---

{% seo %}
<meta property="og:type" content="article">
<meta name="keywords" content="{{ page.categories | join: ', ' }}">

<article class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title | escape }}</h1>
  </header>

  <div class="post-content">
    {{ content }}
  </div>

  {% include ads.html %}
  {% include social-share.html %}
</article>
EOF

    # Social share template
    cat <<EOF > "${project_name}/_includes/social-share.html"
<div class="social-share">
  <a href="https://twitter.com/share?url={{ site.url }}{{ page.url }}">Tweet</a>
  <a href="https://www.facebook.com/sharer.php?u={{ site.url }}{{ page.url }}">Share</a>
</div>
EOF
}

# Main script
echo "🚀 Starting automated blog setup"

# Get user input
read -p "Enter project name: " project_name
read -p "Enter GitHub username: " github_username

# Create directory structure
echo "📂 Creating directory structure..."
create_dirs

# Initialize Jekyll
echo "🛠️ Initializing Jekyll site..."
cd "${project_name}" || exit
jekyll new . --force --skip-bundle

# Add Minimal Mistakes theme
echo "🎨 Adding Minimal Mistakes theme..."
echo "gem 'minimal-mistakes-jekyll'" >> Gemfile
bundle install

# Create configuration files
echo "⚙️ Creating config files..."
create_config_files

# Create automation scripts
echo "🤖 Creating automation scripts..."
create_automation_script

# Create template files
echo "📄 Creating template files..."
create_template_files

# Initialize Git repository
echo "🔧 Initializing Git repository..."
git init
git branch -M main
git add .
git commit -m "Initial commit"

# Create GitHub repository
echo "🌐 Creating GitHub repository..."
gh repo create "${project_name}" --public --confirm
git push -u origin main

echo "✅ Setup complete! Next steps:"
echo "1. Add secrets to GitHub repository:"
echo "   - NEWS_API_KEY: Get from https://newsapi.org"
echo "2. Replace AdSense placeholder in _includes/ads.html"
echo "3. Configure Google Search Console"
echo "4. Set up AdSense/affiliate accounts"
echo "Access your blog at: https://${hvenkatraman}.github.io/${project_name}"
