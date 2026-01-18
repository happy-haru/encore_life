import requests

BASE_URL = "http://localhost:3000/api/posts"

def test_getpostbyid_nonexistent_post_returns_404():
    non_existent_post_id = "00000000-0000-0000-0000-000000000000"  # UUID format, guaranteed non-existent

    try:
        response = requests.get(
            f"{BASE_URL}/getPostById",
            params={"id": non_existent_post_id},
            timeout=30
        )
        assert response.status_code == 404, f"Expected status code 404, got {response.status_code}"
        # Optional: validate error message or response content if known
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"

test_getpostbyid_nonexistent_post_returns_404()