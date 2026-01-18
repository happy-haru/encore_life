import requests
import uuid

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30

# Example authentication: Bearer token
AUTH_TOKEN = "Bearer your_valid_auth_token_here"

def test_deletepost_authenticated_owner_success():
    headers = {
        "Authorization": AUTH_TOKEN,
        "Accept": "application/json",
    }
    created_post_id = None
    created_post_category = "test-category"

    try:
        # Step 1: Create a new post to delete
        create_url = f"{BASE_URL}/createPost"
        create_data = {
            "title": "Post to be deleted",
            "content": "This post will be deleted by authenticated owner.",
            "category": created_post_category,
        }
        # Send as multipart/form-data
        files = {k: (None, v) for k, v in create_data.items()}
        create_response = requests.post(
            create_url,
            headers=headers,
            files=files,
            timeout=TIMEOUT,
        )
        assert create_response.status_code == 303, f"Expected 303 on createPost, got {create_response.status_code}"
        # The API redirects to category page on success - no JSON body expected

        # Step 2: Retrieve posts by category to find created post ID
        get_by_cat_url = f"{BASE_URL}/getPostsByCategory"
        params = {"category": created_post_category}
        get_cat_response = requests.get(get_by_cat_url, params=params, timeout=TIMEOUT)
        assert get_cat_response.status_code == 200, f"Expected 200 on getPostsByCategory, got {get_cat_response.status_code}"
        posts = get_cat_response.json()
        # Find post matching title
        matching_posts = [p for p in posts if p.get("title") == create_data["title"]]
        assert matching_posts, "Created post not found in category list"
        created_post_id = matching_posts[0].get("id")
        assert created_post_id is not None, "Created post does not have an ID"

        # Step 3: Delete the post by authenticated owner
        delete_url = f"{BASE_URL}/deletePost"
        delete_params = {
            "id": created_post_id,
            "category": created_post_category,
        }
        delete_response = requests.delete(
            delete_url, headers=headers, params=delete_params, timeout=TIMEOUT
        )
        assert delete_response.status_code == 200, f"Expected 200 on deletePost, got {delete_response.status_code}"
        # Deletion success response may not contain JSON, so just check status code

        # Step 4: Confirm the post no longer exists
        get_post_url = f"{BASE_URL}/getPostById"
        get_post_params = {"id": created_post_id}
        get_post_response = requests.get(get_post_url, params=get_post_params, timeout=TIMEOUT)
        assert get_post_response.status_code == 404, "Deleted post still accessible, expected 404"

    finally:
        # Cleanup: Attempt to delete post if still exists (in case test failed before delete)
        if created_post_id:
            try:
                requests.delete(
                    f"{BASE_URL}/deletePost",
                    headers=headers,
                    params={"id": created_post_id, "category": created_post_category},
                    timeout=TIMEOUT,
                )
            except Exception:
                pass

test_deletepost_authenticated_owner_success()
