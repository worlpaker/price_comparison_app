from time import perf_counter
from scrapy.crawler import CrawlerProcess
from multiprocessing import Process, Queue
from scrapy.utils.project import get_project_settings
from cmprice.spiders.hepsiburada import hepsiburada
from cmprice.spiders.trendyol import trendyol
from model import IResult
import numpy as np
import re


class Spidy:
    def __init__(self, product_name: str) -> None:
        """
        Crawl hepsiburada and trendyol(till page 5)

        Gets only exact words of products

        Finally compares their best price

        Args:
            product_name (str): search words/product name
        """
        self.product_name = product_name

    def myscript(self) -> None:
        """Multiple spiders settings"""

        settings = get_project_settings()
        process = CrawlerProcess(settings)
        process.crawl(
            trendyol,
            start_urls=[
                f"https://www.trendyol.com/sr?q={self.product_name}",
            ],
            product_name=self.product_name,
        )
        process.crawl(
            hepsiburada,
            start_urls=[
                f"https://www.hepsiburada.com/ara?q={self.product_name}",
            ],
            product_name=self.product_name,
        )
        process.start()
        self.clear_array([hepsiburada.Data, trendyol.Data])
        self.compare_price()

    def clear_array(self, cl_list: list[list]) -> None:
        """
        Clears array and only exact words of products will contain.

        Converts price to float

        Args:
            cl_list (list[list]): list of all data
        """

        product = self.product_name.split()
        for new_list in cl_list:
            new_list["Price"] = [
                float(i.replace("TL", "").replace(".", "").replace(",", "."))
                for i in new_list["Price"]
            ]
        [
            (x, y, z)
            for x, y, z in zip(new_list["Name"], new_list["Price"], new_list["Link"])
            if all(re.search("{}".format(w), x, re.I) for w in product)
        ]

    def compare_price(self) -> Queue:
        """Compare prices between hepsiburada and trendyol"""

        hepsi_list = IResult(
            website="Hepsiburada",
            price=min(hepsiburada.Data["Price"]),
            product=hepsiburada.Data["Name"][np.argmin(hepsiburada.Data["Price"])],
            url="https://www.hepsiburada.com"
            + hepsiburada.Data["Link"][np.argmin(hepsiburada.Data["Price"])],
        )

        trendyol_list = IResult(
            website="Trendyol",
            price=min(trendyol.Data["Price"]),
            product=trendyol.Data["Name"][np.argmin(trendyol.Data["Price"])],
            url="https://www.trendyol.com"
            + trendyol.Data["Link"][np.argmin(trendyol.Data["Price"])],
        )
        print("-" * 100)
        print("Minimum Price-Hepsiburada.com:", hepsi_list.price, hepsi_list.product)
        print("Minimum Price-Trendyol.com:", trendyol_list.price, trendyol_list.product)
        print("#" * 100)
        print("hepsilength:", len(hepsiburada.Data["Price"]))
        print("trendyollength:", len(trendyol.Data["Price"]))

        return (
            self.q.put([hepsi_list, trendyol_list])
            if hepsi_list.price < trendyol_list.price
            else self.q.put([trendyol_list, hepsi_list])
        )

    def crawl(self) -> list:
        """Multiprocess start to crawl

        Returns:
            list: best price from trendyol and hepsiburada
        """

        s = perf_counter()
        self.q = Queue()
        process = Process(target=self.myscript)
        process.start()
        process.join()
        message = self.q.get()
        f = perf_counter()
        print(f"Running Time: {f-s}")
        return message
