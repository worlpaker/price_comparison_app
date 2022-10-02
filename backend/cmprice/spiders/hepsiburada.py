import scrapy


class hepsiburada(scrapy.Spider):
    name = "hepsiburada"

    Data = {"Name": [], "Price": [], "Link": []}
    page_number = 1

    def __init__(self, product_name, start_urls):
        self.product_name = product_name
        self.start_urls = start_urls

    def parse(self, response):
        for res in response.css("body > div.wrapper > main"):
            Prd_Name = res.css('h3[data-test-id="product-card-name"]::text').extract()
            Prd_Price = res.css(
                'div[data-test-id="price-current-price"]::text'
            ).extract()
            Prd_Link = res.css("li[type='comfort']> div >a::attr(href)").extract()
            # Prd_Image = res.css('div[data-test-id="product-image-image"] > picture > img::attr(src)').extract()
            # copy them to data
            hepsiburada.Data["Name"] += Prd_Name[:]
            hepsiburada.Data["Price"] += Prd_Price[:]
            hepsiburada.Data["Link"] += Prd_Link[:]

        # until page 5
        if hepsiburada.page_number != 6:
            hepsiburada.page_number += 1
            # next url link
            yield scrapy.Request(
                response.urljoin(
                    f"ara?q={self.product_name}&sayfa={hepsiburada.page_number}"
                ),
            )
