import scrapy
from tcc.items import TccItem
import time
from selenium import webdriver

class TripAdvisorTurkishFullSpider(scrapy.Spider):
    name = 'TripadvisorFull Turkey'
    # allowed_domains = ['tripadvisor.tr']
    start_urls = ['https://www.tripadvisor.com.tr']

    # 1. get the main page links
    # 2. go for the review page
    # 3. parse the posts
    # 4. get the next page
    # 5. go to 3 or end
    # 6. end

    def __init__(self):
        self.driver = webdriver.Firefox()

    def parse(self, response):
        # get the main page links
        list_link = response.css("div.shelf_container a.ui_poi_thumbnail::attr(href)").extract()
        for topic_link in list_link:
            # for each link go to the review page
            yield response.follow(topic_link, self.parse_responses_page)

    def parse_responses_page(self, responsesPage):
        self.driver.get(responsesPage.url)
        btn = self.driver.find_element_by_css_selector('div.review-container p.partial_entry span.ulBlueLinks')
        time.sleep(1)
        btn.click()
        time.sleep(1)

        for review in responsesPage.css("div.review-container"):
            text = "".join(review.css("p.partial_entry ::text").extract())
            source = 'tripadvisortr'
            link = responsesPage.url
            print(text.encode('utf-8'))
            parsed = TccItem(text=text, source=source, link=link)

            # navigate through the pages
            next_page = review.css("a.nav.next::attr(href)").extract_first()

            # inside a response page navigate
            if next_page is not None:
                yield review.follow(next_page, self.parse_responses_page)

            yield parsed



