import requests

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30

# Set your valid authentication token here
AUTH_TOKEN = "Bearer your_valid_auth_token_here"

def test_createpost_authenticated_user_success():
    url = f"{BASE_URL}/createPost"
    headers = {
        "Authorization": AUTH_TOKEN,
    }
    payload = {
        "title": "Test Post Title",
        "content": "This is a test post content for authenticated user creation.",
        "category": "general"
    }
    try:
        # Use 'files' to send multipart/form-data
        response = requests.post(url, headers=headers, files=payload, timeout=TIMEOUT, allow_redirects=False)
    except requests.RequestException as e:
        assert False, f"Request to create post failed with exception: {e}"

    # According to PRD, on success it returns HTTP 303 redirect to category page
    assert response.status_code == 303, f"Expected 303 redirect, got {response.status_code}"

    # The Location header should point to the category page
    location = response.headers.get("Location")
    assert location is not None, "Redirect location header missing"
    assert payload["category"] in location, f"Redirect location {location} does not contain category {payload['category']}"

test_createpost_authenticated_user_success()
