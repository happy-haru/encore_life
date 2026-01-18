import requests
import uuid

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

# Provide valid authentication token for the authenticated owner user
AUTH_TOKEN = "Bearer YOUR_AUTH_TOKEN_HERE"

def test_deletepost_authenticated_owner_success():
    headers = {
        "Authorization": AUTH_TOKEN
    }

    # Create a new post first to ensure ownership and a valid post to delete
    create_url = f"{BASE_URL}/createPost"
    # Multipart form-data payload as per API schema: title, content, category are required
    post_data = {
        "title": "Test Post for Deletion " + str(uuid.uuid4()),
        "content": "Content of the post to be deleted.",
        "category": "general"
    }

    try:
        # Create post (expects 303 redirect on success)
        create_response = requests.post(create_url, headers=headers, data=post_data, timeout=TIMEOUT, allow_redirects=False)
        assert create_response.status_code == 303, f"Expected 303 on createPost, got {create_response.status_code}"

        # It is assumed that the response or headers do not provide the new post ID directly
        # So we attempt to locate the post by category and title to get its ID.
        get_category_url = f"{BASE_URL}/getPostsByCategory"
        params = {"category": post_data["category"]}
        get_response = requests.get(get_category_url, params=params, timeout=TIMEOUT)
        assert get_response.status_code == 200, f"Expected 200 on getPostsByCategory, got {get_response.status_code}"

        posts = get_response.json()
        # Find the post we just created by matching title and content (should be unique enough)
        post_id = None
        for post in posts:
            if post.get("title") == post_data["title"] and post.get("content") == post_data["content"]:
                post_id = post.get("id")
                break
        assert post_id is not None, "Created post not found in category listing."

        # Delete the post now
        delete_url = f"{BASE_URL}/deletePost"
        delete_params = {
            "id": post_id,
            "category": post_data["category"]
        }
        delete_response = requests.delete(delete_url, headers=headers, params=delete_params, timeout=TIMEOUT)
        assert delete_response.status_code == 200, f"Expected 200 on deletePost, got {delete_response.status_code}"

        delete_json = delete_response.json()
        # Expect the response confirms deletion - at least success message or deleted post id
        assert "deleted" in delete_json.get("message", "").lower() or delete_json.get("id") == post_id, \
            "Delete response does not confirm deletion."

        # Verify the post no longer exists by attempting to fetch it
        get_post_url = f"{BASE_URL}/getPostById"
        get_post_params = {"id": post_id}
        get_post_response = requests.get(get_post_url, params=get_post_params, timeout=TIMEOUT)
        assert get_post_response.status_code == 404, "Post still accessible after deletion; expected 404."

    finally:
        # Cleanup: If for some reason post wasn't deleted, attempt to delete again
        if 'post_id' in locals() and post_id is not None:
            try:
                requests.delete(f"{BASE_URL}/deletePost",
                                headers=headers,
                                params={"id": post_id, "category": post_data["category"]},
                                timeout=TIMEOUT)
            except Exception:
                pass

test_deletepost_authenticated_owner_success()
