import requests

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30

def test_getpostsbycategory_valid_category_success():
    category = "technology"

    try:
        # Make GET request to fetch posts by category
        response = requests.get(
            f"{BASE_URL}/getPostsByCategory",
            params={"category": category},
            timeout=TIMEOUT,
        )
        # Assert the response status code is 200
        assert response.status_code == 200, f"Expected status 200, got {response.status_code}"

        posts = response.json()
        # Assert response is a list
        assert isinstance(posts, list), "Response is not a list"

        # Assert all posts have the requested category
        for post in posts:
            assert "category" in post, "Post missing 'category' field"
            assert post["category"] == category, f"Post category '{post['category']}' does not match requested '{category}'"

        # Assert optimized payload size: posts contain only essential fields: id, title, category (assumption)
        allowed_keys = {"id", "title", "category"}
        for post in posts:
            extra_keys = set(post.keys()) - allowed_keys
            assert not extra_keys, f"Post contains unexpected fields: {extra_keys}"

    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_getpostsbycategory_valid_category_success()