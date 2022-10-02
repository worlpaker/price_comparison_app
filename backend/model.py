from pydantic import BaseModel


class Item(BaseModel):
    product: str


class IResult(BaseModel):
    website: str
    product: str
    price: float
    url: str
