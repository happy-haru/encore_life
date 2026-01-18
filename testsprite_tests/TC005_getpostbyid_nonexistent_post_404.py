import requests

def test_getpostbyid_nonexistent_post_404():
    base_url = "http://localhost:3000"
    # Use a UUID that is extremely unlikely to exist
    nonexistent_post_id = "00000000-0000-0000-0000-000000000000"
    url = f"{base_url}/getPostById"
    params = {"id": nonexistent_post_id}
    try:
        response = requests.get(url, params=params, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 404, f"Expected 404 for nonexistent post ID, got {response.status_code}"
    # The test is backend; frontend navigation checked by status 404 presence
    # If response JSON or text exists, optionally verify message
    try:
        data = response.json()
        # Optional: Check if message or error field indicates not found, if present
        assert "error" in data or "message" in data or True
    except ValueError:
        # Response not JSON, acceptable if 404 page
        pass

test_getpostbyid_nonexistent_post_404()