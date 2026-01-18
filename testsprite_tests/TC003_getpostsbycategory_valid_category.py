import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_getpostsbycategory_valid_category():
    category = "technology"  # Assuming 'technology' is a valid category

    try:
        response = requests.get(
            f"{BASE_URL}/getPostsByCategory",
            params={"category": category},
            timeout=TIMEOUT
        )
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    try:
        posts = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert isinstance(posts, list), "Response JSON should be a list"

    # Validate all posts belong to the requested category and payload is optimized
    # Assuming optimized payload means not including heavy content fields, 
    # so posts should at least contain an id and category field and minimal other fields.
    for post in posts:
        assert isinstance(post, dict), "Each post should be a dict"
        assert "category" in post, "Post missing 'category' field"
        assert post["category"] == category, f"Post category {post['category']} does not match requested category {category}"
        # Check for minimal payload: at least 'id' and 'title' fields expected
        assert "id" in post, "Post missing 'id' field"
        assert "title" in post, "Post missing 'title' field"

        # Check no heavy payload fields like full 'content' if possible
        # This depends on API design; if there's a large 'content' field, it should be omitted or truncated
        if "content" in post:
            # If content is present, check it is short (e.g. less than 500 chars)
            assert len(post["content"]) < 500, "Post content not optimized, too large payload"

test_getpostsbycategory_valid_category()