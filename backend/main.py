from fastapi import FastAPI, Response, status, Request
from fastapi.middleware.cors import CORSMiddleware
from model import Item
from script import Spidy


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # web
    "http://localhost:8081",  # mobile
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/search")
async def create_item(item: Item, response: Response, request: Request):
    print(
        f"\033[92mScraper: \033[0mStarting to scrape for client_id: {request.client.host} - product: {item.product}"
    )
    try:
        start = Spidy(product_name=item.product)
        message = start.crawl()
    except Exception as e:
        err_message = {"error": e}
        print(err_message)
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return err_message
    return message
