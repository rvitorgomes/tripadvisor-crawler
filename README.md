# textCrawler

Installation

1. Download and install anaconda
https://www.anaconda.com/download/

2. Clone this repository
$ git clone https://github.com/rvitorgomes/textCrawler folderName

3. Go to the created folder and check if the requirements are installed
$ cd folderName
$ python --version
$ conda --version

4. Create and activate a new conda environment
$ conda create -n crawler
$ activate crawler

5. Install the packages
$ conda install scrapy
$ conda install -c conda-forge selenium

6. Check if you have the latest WebDriver for Firefox (geckodriver.exe) inside the project root, otherwise you can download from https://github.com/mozilla/geckodriver/releases

7. Check if you have a output file inside the project root (data.txt)

8. Run some crawler and watch out the magic
$ scrapy runspider tcc/italian.py

9. Check the output file




