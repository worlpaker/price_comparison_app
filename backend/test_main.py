from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_create_item():
    response = client.post("/api/search", json={"product": "nvidia gtx 1050 ti"})
    assert response.status_code == 200
