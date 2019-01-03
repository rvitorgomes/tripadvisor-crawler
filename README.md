
<h1 align="center">
  <br>
    TripAdvisor Scraper
  <br>
</h1>

<h4 align="center">Scrap milions of hotel reviews.</h4>

<p align="center">
  <a href="#about">About</a> •
  <a href="#content">Content</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#how-to-use">How to use</a> •
  <a href="#license">License</a>
</p>

## About
<p>
  This project is part of an academic monography developed to collect a corpus to analyse statistical distribuitions of diacritics errors in european languages with high accent frequency and its comparison with brazilian portuguese.
</p>

## Content

* Scrapers written in Python3
  - Italian
  - Turkish
  
* Scrapers written in NodeJS
  - Hungarian
  - French

## Getting Started

To clone and run this application, you'll need: <br>
 - [Git](https://git-scm.com) <br>
 - [Node 8+](https://nodejs.org/en/download/)
*If you have different Node versions make sure to install using nvm.* <br>
 - [Conda for Python3](https://conda.io/docs/user-guide/install/index.html)


## How To Use
From your command line:

```bash
# Clone this repository
$ git clone https://github.com/rvitorgomes/textCrawler tripadvisor-crawler

# Go into the repository
$ cd tripadvisor-crawler

# Check for dependencies
$ conda --version; python --version; node --version; npm --version

# Install dependencies
$ npm install

# Change directory
$ cd tcc

# Create and activate a new conda environment
$ conda create -n crawler; activate crawler

# Install scrapy
$ conda install scrapy

# Run some crawler and watch out the magic
$ scrapy runspider tcc/italian.py
```

# Common Errors

Check if you have the latest WebDriver for Firefox (geckodriver.exe) inside the project root, otherwise you can download from [https://github.com/mozilla/geckodriver/releases](https://github.com/mozilla/geckodriver/releases)


## License

MIT

---
> GitHub [@rvitorgomes](https://github.com/rvitorgomes) &nbsp;&middot;&nbsp;
> Linkedin [Rubens Gomes](https://linkedin.com/rvitorgomes)


## Licensing

This project is licensed under Unlicense license. <br>
**Not for commercial usage.** <br>
**For academic usage ask me for reference.** <br>

[issues]:https://github.com/rvitorgomes/textCrawler/issues/new

