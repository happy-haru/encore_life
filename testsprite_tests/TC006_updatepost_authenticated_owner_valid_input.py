import requests
from requests.exceptions import RequestException
import uuid

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

# Replace with valid credentials or token for an authenticated owner user
# Assuming bearer token authentication for example; adapt as required.
AUTH_HEADERS = {
    "Authorization": "Bearer valid_owner_user_token"
}

def create_post(title, content, category):
    url = f"{BASE_URL}/createPost"
    # multipart/form-data payload using requests' 'files'
    # but since data is simple and textual, we can send as data with multipart/form-data
    files = {
        "title": (None, title),
        "content": (None, content),
        "category": (None, category),
    }
    response = requests.post(url, files=files, headers=AUTH_HEADERS, timeout=TIMEOUT, allow_redirects=False)
    return response

def update_post(post_id, title, content, category):
    url = f"{BASE_URL}/updatePost"
    params = {"id": post_id}
    files = {
        "title": (None, title),
        "content": (None, content),
        "category": (None, category)
    }
    response = requests.post(url, params=params, files=files, headers=AUTH_HEADERS, timeout=TIMEOUT, allow_redirects=False)
    return response

def delete_post(post_id, category):
    url = f"{BASE_URL}/deletePost"
    params = {"id": post_id, "category": category}
    response = requests.delete(url, params=params, headers=AUTH_HEADERS, timeout=TIMEOUT)
    return response

def get_post_by_id(post_id):
    url = f"{BASE_URL}/getPostById"
    params = {"id": post_id}
    response = requests.get(url, params=params, timeout=TIMEOUT)
    return response

def test_updatepost_authenticated_owner_valid_input():
    # Step 1: Create a post to update
    orig_title = "Original Title for Update Test"
    orig_content = "Original content."
    category = "general"
    new_title = "Updated Title"
    new_content = "Updated content."

    response_create = create_post(orig_title, orig_content, category)
    try:
        # The expected response on create is 303 redirect to category page
        assert response_create.status_code == 303, f"Expected 303 redirect on create, got {response_create.status_code}"

        # Extract the Location header or fetch created post by category to find the new post ID
        # Since no response body is specified, we must get the new post id by fetching posts by category and filtering on title
        # However, we have no endpoint to get posts by owner, so we'll get posts by category and find the one with the exact title/content

        # Fetch posts by category
        resp_posts = requests.get(f"{BASE_URL}/getPostsByCategory", params={"category": category}, timeout=TIMEOUT)
        assert resp_posts.status_code == 200, f"Expected 200 fetching posts by category, got {resp_posts.status_code}"
        posts = resp_posts.json()
        # Find the created post in posts list, matching both title and content (assuming these fields included)
        created_post = None
        for post in posts:
            if post.get("title") == orig_title and post.get("content") == orig_content:
                created_post = post
                break
        assert created_post is not None, "Created post not found in posts by category"

        post_id = created_post.get("id")
        assert post_id is not None, "Post ID missing in created post"

        # Step 2: Update the post as authenticated owner with valid input
        response_update = update_post(post_id, new_title, new_content, category)
        # Expect 303 redirect to post detail page on success per PRD
        assert response_update.status_code == 303, f"Expected 303 redirect on update, got {response_update.status_code}"
        location_header = response_update.headers.get("Location")
        assert location_header is not None and post_id in location_header, "Redirect Location header missing or not pointing to updated post"

        # Step 3: Verify post is updated by fetching post details
        response_get = get_post_by_id(post_id)
        assert response_get.status_code == 200, f"Expected 200 fetching updated post, got {response_get.status_code}"
        post_data = response_get.json()
        assert post_data.get("title") == new_title, "Post title was not updated correctly"
        assert post_data.get("content") == new_content, "Post content was not updated correctly"
        assert post_data.get("category") == category, "Post category should remain the same"

    finally:
        # Cleanup: delete the created post
        if 'post_id' in locals():
            try:
                response_delete = delete_post(post_id, category)
                assert response_delete.status_code == 200, f"Failed to delete post during cleanup, status code: {response_delete.status_code}"
            except RequestException:
                pass

test_updatepost_authenticated_owner_valid_input()