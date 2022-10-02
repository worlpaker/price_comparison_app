# Scrapy settings for cmprice project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = "cmprice"

SPIDER_MODULES = ["cmprice.spiders"]
NEWSPIDER_MODULE = "cmprice.spiders"


# Crawl responsibly by identifying yourself (and your website) on the user-agent
# USER_AGENT = 'cmprice (+http://www.yourdomain.com)'
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"

#Logs
LOG_ENABLED = False

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Fast and secure settings
DOWNLOAD_DELAY = 1
DOWNLOAD_TIMEOUT = 30
RANDOMIZE_DOWNLOAD_DELAY = True

REACTOR_THREADPOOL_MAXSIZE = 128
CONCURRENT_REQUESTS = 256
CONCURRENT_REQUESTS_PER_DOMAIN = 256
CONCURRENT_REQUESTS_PER_IP = 256

AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 1
AUTOTHROTTLE_MAX_DELAY = 0.25
AUTOTHROTTLE_TARGET_CONCURRENCY = 128
AUTOTHROTTLE_DEBUG = True


DOWNLOADER_MIDDLEWARES = {
    "scrapy.spidermiddlewares.referer.RefererMiddleware": 80,
    "scrapy.downloadermiddlewares.retry.RetryMiddleware": None,
    "scrapy.downloadermiddlewares.cookies.CookiesMiddleware": 130,
    "scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware": 810,
    "scrapy.downloadermiddlewares.redirect.RedirectMiddleware": 900,
}
