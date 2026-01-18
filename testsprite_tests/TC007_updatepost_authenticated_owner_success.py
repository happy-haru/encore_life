import requests
import uuid

BASE_URL = "http://localhost:3000/api"
TIMEOUT = 30

# Presumed valid authentication token of the owner user
AUTH_TOKEN = "Bearer example_valid_owner_jwt_token"

def test_updatepost_authenticated_owner_success():
    headers = {
        "Authorization": AUTH_TOKEN,
    }

    # Step 1: Create a new post to update later
    create_headers = {
        **headers,
        "Content-Type": "multipart/form-data"
    }
    create_data = {
        "title": "Original Post Title",
        "content": "Original post content for testing update.",
        "category": "technology"
    }
    create_response = requests.post(f"{BASE_URL}/createPost", headers=create_headers, data=create_data, timeout=TIMEOUT)
    assert create_response.status_code == 303, f"Expected 303 on post creation, got {create_response.status_code}"

    # After creation, we need to get the post id - assume the system stores it in created Location URL (e.g. /posts/{id})
    location = create_response.headers.get("Location", "")
    post_id = None
    if location:
        # Extract UUID from URL (expect something like /posts/<uuid>)
        parts = location.rstrip('/').split('/')
        if parts:
            candidate = parts[-1]
            try:
                uuid.UUID(candidate)
                post_id = candidate
            except ValueError:
                pass

    assert post_id is not None, "Failed to extract post ID from creation redirect location"

    try:
        # Step 2: Update the post
        update_headers = {
            **headers,
            "Content-Type": "multipart/form-data"
        }
        update_data = {
            "title": "Updated Post Title",
            "content": "Updated post content with valid data for the authenticated owner.",
            "category": "technology"
        }
        update_params = {"id": post_id}
        update_response = requests.post(f"{BASE_URL}/updatePost", headers=update_headers, params=update_params, data=update_data, timeout=TIMEOUT)

        # Success response is 303 redirecting to the post detail page
        assert update_response.status_code == 303, f"Expected 303 on update, got {update_response.status_code}"

        location_update = update_response.headers.get("Location", "")
        assert location_update.endswith(post_id), "Update redirect location does not point to post detail page"

        # Step 3: Fetch the post to confirm update and ownership enforcement
        get_response = requests.get(f"{BASE_URL}/getPostById", params={"id": post_id}, timeout=TIMEOUT)
        assert get_response.status_code == 200, f"Expected 200 for getPostById, got {get_response.status_code}"
        post_data = get_response.json()
        assert post_data.get("title") == update_data["title"], "Post title was not updated correctly"
        assert post_data.get("content") == update_data["content"], "Post content was not updated correctly"
        assert post_data.get("category") == update_data["category"], "Post category was not updated correctly"

    finally:
        # Cleanup: Delete the created post
        delete_params = {"id": post_id, "category": update_data["category"]}
        delete_response = requests.delete(f"{BASE_URL}/deletePost", headers=headers, params=delete_params, timeout=TIMEOUT)
        assert delete_response.status_code == 200, f"Expected 200 on delete, got {delete_response.status_code}"

test_updatepost_authenticated_owner_success()
