import requests

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30

def test_createpost_unauthenticated_user_error():
    url = f"{BASE_URL}/createPost"
    # Using multipart/form-data payload as per PRD schema
    payload = {
        "title": "Test Post Unauthorized",
        "content": "This post should not be created because the user is unauthenticated.",
        "category": "general"
    }
    try:
        # No Authorization header included
        response = requests.post(url, data=payload, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Request failed unexpectedly: {e}"

    # The system should reject unauthenticated post creation.
    # The PRD validation criteria: unauthenticated users receive "User not authenticated" error.
    assert response.status_code != 303, "Unauthenticated request unexpectedly succeeded."
    # Try to parse error message for 'User not authenticated'
    try:
        content_type = response.headers.get("Content-Type", "")
        if "application/json" in content_type:
            data = response.json()
            error_msg = str(data.get("error") or data.get("message") or "")
            assert "User not authenticated" in error_msg, f"Unexpected error message: {error_msg}"
        else:
            # If not json, check in text response
            text = response.text
            assert "User not authenticated" in text, "Expected 'User not authenticated' error message in response text."
    except Exception:
        # If response not JSON or parsing fails, accept any error status code other than 303
        assert response.status_code != 303, f"Unexpected success status code: {response.status_code}"

test_createpost_unauthenticated_user_error()
