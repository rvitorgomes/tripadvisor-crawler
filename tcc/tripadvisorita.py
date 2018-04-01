import scrapy
from tcc.items import TccItem

class TripAdvisorItalianSpider(scrapy.Spider):
    name = 'Tripadvisor ITA'
    allowed_domains = ['tripadvisor.it']
    start_urls = ['https://www.tripadvisor.it/ShowTopic-g1-i13217-k11248247-El_cuaderno_rojo_de_Cuba-Diari_di_viaggio.html']

    def parse(self, response):
      for post in response.css("div.postcontent"):
        text = "".join(post.css("div.postBody ::text").extract())
        date = post.css("div.postDate::text").extract_first()
        source = 'tripadvisorita'
        link = response.url

        parsed = TccItem(text=text, date=date, source=source, link=link)
        next_page = response.css("a.sprite-pageNext::attr(href)").extract_first()

        if next_page is not None:
            yield response.follow(next_page, self.parse)

        yield parsed