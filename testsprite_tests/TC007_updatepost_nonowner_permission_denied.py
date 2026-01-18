import requests
import uuid

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

# These tokens represent two different users:
# OWNER_TOKEN: token of the post owner user
# NONOWNER_TOKEN: token of a different user who is not the owner
OWNER_TOKEN = "Bearer owner_user_auth_token"
NONOWNER_TOKEN = "Bearer non_owner_user_auth_token"

def test_updatepost_nonowner_permission_denied():
    post_id = None
    headers_owner = {
        "Authorization": OWNER_TOKEN,
    }
    headers_nonowner = {
        "Authorization": NONOWNER_TOKEN,
    }

    # Step 1: Create a new post as the owner user
    create_url = f"{BASE_URL}/createPost"
    create_data = {
        "title": "Original Title TC007",
        "content": "Original content of the post for TC007",
        "category": "general"
    }
    try:
        # Send as multipart/form-data
        files = {k: (None, v) for k, v in create_data.items()}
        response_create = requests.post(create_url, headers=headers_owner, files=files, timeout=TIMEOUT)
        # The 303 redirect indicates success on creation
        assert response_create.status_code == 303, f"Expected 303 on createPost, got {response_create.status_code}"
        # We expect the Location header or similar, but not mandatory here
        # To get the new post ID, we fetch posts by category and find the latest matching title
        get_posts_url = f"{BASE_URL}/getPostsByCategory"
        params = {"category": create_data["category"]}
        resp_get = requests.get(get_posts_url, params=params, timeout=TIMEOUT)
        resp_get.raise_for_status()
        posts = resp_get.json()
        # Find the post with matching title and content to get its ID
        matching_posts = [p for p in posts if p.get("title") == create_data["title"] and p.get("content") == create_data["content"]]
        assert matching_posts, "Created post not found in category list"
        post_id = matching_posts[0]["id"]
        assert post_id is not None, "Created post ID is None"

        # Step 2: Attempt to update the post as a non-owner user (should be denied)
        update_url = f"{BASE_URL}/updatePost"
        params_update = {"id": post_id}
        update_data = {
            "title": "Malicious Update Attempt",
            "content": "This update should be denied",
            "category": "general"
        }
        response_update = requests.post(update_url, headers=headers_nonowner, params=params_update, data=update_data, timeout=TIMEOUT)
        # The update should be denied.
        # According to PRD, server may return 500 or an error indicating permission denied.
        # Check for 500 or other error status
        assert response_update.status_code == 500, f"Expected 500 on update by non-owner, got {response_update.status_code}"

        # Optionally check response content includes error indication (optional)
        try:
            error_json = response_update.json()
            # Error message or code expected, check if contains "permission", "denied" or similar
            error_msg = str(error_json).lower()
            assert ("permission" in error_msg or "denied" in error_msg or "error" in error_msg), "Error message does not indicate permission denied"
        except Exception:
            # If response is not JSON, that's acceptable
            pass

        # Step 3: Verify the post was not updated by fetching it as public
        get_post_url = f"{BASE_URL}/getPostById"
        params_get_post = {"id": post_id}
        response_get_post = requests.get(get_post_url, params=params_get_post, timeout=TIMEOUT)
        response_get_post.raise_for_status()
        post_data = response_get_post.json()
        assert post_data["title"] == create_data["title"], "Post title changed despite update by non-owner"
        assert post_data["content"] == create_data["content"], "Post content changed despite update by non-owner"
        assert post_data["category"] == create_data["category"], "Post category changed despite update by non-owner"

    finally:
        # Cleanup: delete the created post as the owner user
        if post_id:
            delete_url = f"{BASE_URL}/deletePost"
            params_delete = {"id": post_id, "category": create_data["category"]}
            try:
                del_resp = requests.delete(delete_url, headers=headers_owner, params=params_delete, timeout=TIMEOUT)
                assert del_resp.status_code == 200, f"Failed to delete post in cleanup, status code: {del_resp.status_code}"
            except Exception:
                # Ignore cleanup exceptions
                pass

test_updatepost_nonowner_permission_denied()
