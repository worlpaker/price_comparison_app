import scrapy


class trendyol(scrapy.Spider):
    name = "trendyol"

    Data = {"Name": [], "Price": [], "Link": []}
    page_number = 1

    def __init__(self, product_name, start_urls):
        self.product_name = product_name
        self.start_urls = start_urls

    def parse(self, response):
        for res in response.css("div.prdct-cntnr-wrppr"):
            Prd_Name = res.css("span.prdct-desc-cntnr-name::text").extract()
            Prd_Price = res.css("div.prc-box-dscntd::text").extract()
            Prd_Link = res.css("div.p-card-chldrn-cntnr > a::attr(href)").extract()
            # Prd_Image = res.css("div.image-container>div>img::attr(src)").extract()
            # copy them to data
            trendyol.Data["Name"] += Prd_Name[:]
            trendyol.Data["Price"] += Prd_Price[:]
            trendyol.Data["Link"] += Prd_Link[:]

        # until page 5
        if trendyol.page_number != 6:
            trendyol.page_number += 1
            # next url link
            yield scrapy.Request(
                response.urljoin(f"sr?q={self.product_name}&pi={trendyol.page_number}")
            )
