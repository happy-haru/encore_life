import requests

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30
AUTH_TOKEN = "Bearer your_authenticated_user_token_here"  # Replace with valid token if available

def test_createpost_validation_errors_for_missing_fields():
    url = f"{BASE_URL}/createPost"
    headers = {
        "Authorization": AUTH_TOKEN,
    }

    test_payloads = [
        {},  # all missing
        {"title": "", "content": "Valid content", "category": "news"},  # empty title
        {"title": "Valid title", "content": "", "category": "news"},  # empty content
        {"title": "Valid title", "content": "Valid content", "category": ""},  # empty category
        {"title": "Valid title", "content": "Valid content"},  # missing category
        {"content": "Valid content", "category": "news"},  # missing title
        {"title": "Valid title", "category": "news"},  # missing content
    ]

    for payload in test_payloads:
        # Prepare multipart/form-data fields as (field, (None, value)) pairs
        # None filename to indicate form field
        files = {}
        for k, v in payload.items():
            files[k] = (None, v)

        # If payload is empty, send empty files {} to mimic form-data with no fields
        try:
            response = requests.post(url, headers=headers, files=files, timeout=TIMEOUT)
        except requests.RequestException as e:
            assert False, f"Request failed with exception: {e}"

        # The API design expects a redirect on success (303), so validation errors should NOT return 303.
        # Assuming validation errors return 400 or 422 or some client error with error message.
        assert response.status_code != 303, f"Unexpected success for payload: {payload}"
        # Expect client error status code (400 or 422), not 500 or 405
        assert response.status_code in (400, 422), f"Expected validation error status code (400/422), got {response.status_code}"

        # Response should contain validation error details to indicate missing/empty fields
        try:
            data = response.json()
        except ValueError:
            # If response is not JSON, fail test
            assert False, "Response is not JSON format when validation error expected"

        # Validate that error messages mention missing or empty required fields
        error_fields = ['title', 'content', 'category']
        error_found = any(field in str(data).lower() for field in error_fields)
        assert error_found, f"No validation error details for missing required fields in response: {data}"


test_createpost_validation_errors_for_missing_fields()