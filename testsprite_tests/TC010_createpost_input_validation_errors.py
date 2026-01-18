import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30
CREATE_POST_ENDPOINT = f"{BASE_URL}/createPost"

# Assuming authentication is via a bearer token for an authenticated user
# Replace 'your_valid_token_here' with a valid auth token for the test environment
AUTH_HEADERS = {
    "Authorization": "Bearer your_valid_token_here"
}


def test_createpost_input_validation_errors():
    # Test creating posts with missing or empty required fields: title, content, category
    test_payloads = [
        # All fields missing
        {},
        # Missing title
        {"content": "Some content", "category": "general"},
        # Missing content
        {"title": "Valid Title", "category": "general"},
        # Missing category
        {"title": "Valid Title", "content": "Some content"},
        # Empty title
        {"title": "", "content": "Some content", "category": "general"},
        # Empty content
        {"title": "Valid Title", "content": "", "category": "general"},
        # Empty category
        {"title": "Valid Title", "content": "Some content", "category": ""},
    ]

    for payload in test_payloads:
        try:
            response = requests.post(
                CREATE_POST_ENDPOINT,
                headers=AUTH_HEADERS,
                files={key: (None, value) for key, value in payload.items()},
                timeout=TIMEOUT,
            )
        except requests.RequestException as e:
            # If there is a connection error or timeout, fail the test for this iteration
            assert False, f"Request failed with exception: {e}"

        # The API defined in PRD returns 303 on success, so any 303 means creation succeeded - which should not happen here
        # Expecting validation error response, probably 400 or a 4xx, or a JSON with error messages - but server error 500 also possible if bad validating.
        # Since spec does not state exact error code for validation failure, checking it is NOT 303 and NOT success
        assert response.status_code != 303, (
            f"Post created successfully with invalid input {payload}, status code: {response.status_code}"
        )
        # Validate that the response indicates validation errors
        # Expect JSON response with error details or text containing validation error
        content_type = response.headers.get("Content-Type", "")
        if "application/json" in content_type:
            try:
                resp_json = response.json()
            except Exception:
                resp_json = None
            assert resp_json is not None, "Response not a valid JSON when expected"
            # There should be some indication of validation errors in JSON
            # Since API doc not explicit, check for keys like 'error', 'message', or 'validation'
            error_keys = ["error", "errors", "message", "validation"]
            assert any(key in resp_json for key in error_keys), \
                f"Response JSON for invalid input {payload} missing expected error keys, got: {resp_json}"
        else:
            # If not JSON, response text should mention validation or required fields
            text = response.text.lower()
            expected_error_words = ["validation", "required", "missing", "empty", "error"]
            assert any(word in text for word in expected_error_words), \
                f"Response text for invalid input {payload} missing validation error message, got: {response.text}"


test_createpost_input_validation_errors()