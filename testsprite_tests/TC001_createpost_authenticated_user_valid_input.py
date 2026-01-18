import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

# Assume a function or variable that provides a valid auth token for an authenticated user
# This should be replaced with actual authentication token retrieval logic
def get_auth_token():
    # Placeholder token; replace with real token retrieval
    return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ValidAuthTokenExample"

def test_createpost_authenticated_user_valid_input():
    url_create_post = f"{BASE_URL}/createPost"
    auth_token = get_auth_token()
    headers = {
        "Authorization": auth_token
    }

    # Valid input data for creating a post
    data = {
        "title": "Test Post Title",
        "content": "This is the content of the test post.",
        "category": "general"
    }

    response = None
    post_id = None

    try:
        response = requests.post(url_create_post, headers=headers, files=data, timeout=TIMEOUT, allow_redirects=False)
        # API responds with 303 redirect on success to category page
        assert response.status_code == 303, f"Expected status 303, got {response.status_code}"
        # The Location header should point to the category page; verify it contains the category
        location = response.headers.get("Location", "")
        assert data["category"] in location, f"Redirect Location header does not include category: {location}"

        # To verify author attribution and post saved, we need to fetch the posts by category
        get_posts_url = f"{BASE_URL}/getPostsByCategory"
        params = {"category": data["category"]}
        get_response = requests.get(get_posts_url, params=params, timeout=TIMEOUT)
        assert get_response.status_code == 200, f"Failed to fetch posts by category, status: {get_response.status_code}"
        posts = get_response.json()
        # Find the post title just created
        matching_posts = [post for post in posts if post.get("title") == data["title"] and post.get("content") == data["content"]]
        assert len(matching_posts) > 0, "Created post not found in category listing"

        # Extract the ID of the created post to delete it after test
        post_id = matching_posts[0].get("id")
        assert post_id is not None, "Created post does not have an ID"

        # Verify author attribution is correct (author name should come from server session, not from client input)
        # Assume the API returns an "author" field for post
        author = matching_posts[0].get("author")
        assert author is not None and author != "", "Author attribution is missing or empty"

    finally:
        # Cleanup: delete the created post if post_id is present
        if post_id:
            delete_url = f"{BASE_URL}/deletePost"
            delete_params = {"id": post_id, "category": data["category"]}
            delete_headers = {
                "Authorization": auth_token
            }
            try:
                del_response = requests.delete(delete_url, headers=delete_headers, params=delete_params, timeout=TIMEOUT)
                assert del_response.status_code == 200, f"Failed to delete post in cleanup, status: {del_response.status_code}"
            except Exception:
                pass


test_createpost_authenticated_user_valid_input()