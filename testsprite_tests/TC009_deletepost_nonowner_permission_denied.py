import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

# Credentials for two users: owner and non-owner
OWNER_AUTH = ("owner_user", "owner_password")       # Replace with actual owner credentials
NON_OWNER_AUTH = ("nonowner_user", "nonowner_password")  # Replace with actual non-owner credentials

def test_deletepost_nonowner_permission_denied():
    # Step 1: Create a post as the owner
    create_url = f"{BASE_URL}/createPost"
    post_data = {
        "title": "Test Post for Nonowner Deletion",
        "content": "Content to verify non-owner deletion is denied.",
        "category": "testcategory"
    }
    # Authenticate as owner to create post
    with requests.Session() as owner_session:
        owner_session.auth = OWNER_AUTH
        try:
            # Send data as multipart/form-data
            multipart_data = {k: (None, v) for k, v in post_data.items()}
            create_resp = owner_session.post(create_url, files=multipart_data, timeout=TIMEOUT)
            assert create_resp.status_code == 303, f"Unexpected createPost status: {create_resp.status_code}"
            # Get the Location header for redirect URL to extract post ID
            location = create_resp.headers.get("Location")
            assert location, "No Location header in createPost response"
            # We'll try to get the post ID by fetching posts by category and matching title
            posts_resp = requests.get(f"{BASE_URL}/getPostsByCategory", params={"category": post_data["category"]}, timeout=TIMEOUT)
            assert posts_resp.status_code == 200, f"Failed to getPostsByCategory: {posts_resp.status_code}"
            posts_json = posts_resp.json()
            # Find the post with matching title
            matching_posts = [p for p in posts_json if p.get("title") == post_data["title"]]
            assert matching_posts, "Created post not found in category list"
            post_id = matching_posts[0].get("id")
            assert post_id, "Post ID missing in post details"

            # Step 2: Attempt to delete the post as a non-owner
            delete_url = f"{BASE_URL}/deletePost"
            params = {
                "id": post_id,
                "category": post_data["category"]
            }
            with requests.Session() as nonowner_session:
                nonowner_session.auth = NON_OWNER_AUTH
                delete_resp = nonowner_session.delete(delete_url, params=params, timeout=TIMEOUT)
                # Deletion by non-owner should fail with error (500) or appropriate error message
                assert delete_resp.status_code != 200, "Non-owner was able to delete the post, which is unexpected"
                # Check for error message indicating permission denied or RLS
                try:
                    error_json = delete_resp.json()
                    error_msg = error_json.get("error") or error_json.get("message") or ""
                    assert any(keyword in error_msg.lower() for keyword in ["permission", "denied", "rls", "unauthorized"]), \
                        f"Error message does not indicate permission denied: {error_msg}"
                except Exception:
                    # If response is not JSON, just ensure status code is error
                    pass
        finally:
            # Cleanup: Delete the post as the owner to keep test idempotent if post_id is set
            if 'post_id' in locals() and post_id:
                with requests.Session() as cleanup_session:
                    cleanup_session.auth = OWNER_AUTH
                    cleanup_session.delete(f"{BASE_URL}/deletePost", params={"id": post_id, "category": post_data["category"]}, timeout=TIMEOUT)

test_deletepost_nonowner_permission_denied()
