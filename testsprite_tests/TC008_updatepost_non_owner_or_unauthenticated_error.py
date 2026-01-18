import requests

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30

def test_updatepost_non_owner_or_unauthenticated_error():
    headers_owner = {
        "Authorization": "Bearer owner-valid-token"
    }
    headers_non_owner = {
        "Authorization": "Bearer non-owner-valid-token"
    }
    headers_no_auth = {}

    post_data_create = {
        "title": "Test Post Owner",
        "content": "Content owned by the creator",
        "category": "general"
    }
    post_data_update = {
        "title": "Updated Title Unauthorized",
        "content": "Updated content unauthorized",
        "category": "general"
    }

    post_id = None
    try:
        # Step 1: Create a post as owner user to get a post ID for update tests
        create_response = requests.post(
            f"{BASE_URL}/createPost",
            headers=headers_owner,
            files={
                "title": (None, post_data_create["title"]),
                "content": (None, post_data_create["content"]),
                "category": (None, post_data_create["category"])
            },
            timeout=TIMEOUT
        )
        assert create_response.status_code == 303, f"Expected 303 on create, got {create_response.status_code}"
        # The post id is not returned in a body but assume we can get it by fetching posts by category and matching title
        # Fetch posts by category to find the created post ID
        get_response = requests.get(
            f"{BASE_URL}/getPostsByCategory",
            params={"category": post_data_create["category"]},
            timeout=TIMEOUT
        )
        assert get_response.status_code == 200, f"Expected 200 on getPostsByCategory, got {get_response.status_code}"
        posts = get_response.json()
        matching_posts = [p for p in posts if p.get("title") == post_data_create["title"]]
        assert matching_posts, "Created post not found in getPostsByCategory response"
        post_id = matching_posts[0].get("id")
        assert post_id, "Post ID not found for created post"

        # Step 2: Attempt update by non-owner user (authenticated but not owner)
        update_response_non_owner = requests.post(
            f"{BASE_URL}/updatePost",
            headers=headers_non_owner,
            params={"id": post_id},
            files={
                "title": (None, post_data_update["title"]),
                "content": (None, post_data_update["content"]),
                "category": (None, post_data_update["category"])
            },
            timeout=TIMEOUT
        )
        # Expect failure: Either 500 due to permission denied or error message in response
        assert update_response_non_owner.status_code != 303, "Non-owner update unexpectedly succeeded"
        assert update_response_non_owner.status_code in [403, 401, 500], f"Unexpected status code for non-owner update: {update_response_non_owner.status_code}"

        # Step 3: Attempt update without authentication
        update_response_no_auth = requests.post(
            f"{BASE_URL}/updatePost",
            headers=headers_no_auth,
            params={"id": post_id},
            files={
                "title": (None, post_data_update["title"]),
                "content": (None, post_data_update["content"]),
                "category": (None, post_data_update["category"])
            },
            timeout=TIMEOUT
        )
        # Expect failure: likely 401 Unauthorized or 500 error
        assert update_response_no_auth.status_code != 303, "Unauthenticated update unexpectedly succeeded"
        assert update_response_no_auth.status_code in [401, 403, 500], f"Unexpected status code for unauthenticated update: {update_response_no_auth.status_code}"

        # Step 4: Confirm post data has not changed by fetching post details
        post_detail_response = requests.get(
            f"{BASE_URL}/getPostById",
            params={"id": post_id},
            timeout=TIMEOUT
        )
        assert post_detail_response.status_code == 200, f"Expected 200 on getPostById, got {post_detail_response.status_code}"
        post_detail = post_detail_response.json()
        assert post_detail["title"] == post_data_create["title"], "Post title changed unexpectedly after unauthorized update"
        assert post_detail["content"] == post_data_create["content"], "Post content changed unexpectedly after unauthorized update"
        assert post_detail["category"] == post_data_create["category"], "Post category changed unexpectedly after unauthorized update"

    finally:
        if post_id:
            # Clean up by deleting the created post as owner
            delete_response = requests.delete(
                f"{BASE_URL}/deletePost",
                headers=headers_owner,
                params={"id": post_id, "category": post_data_create["category"]},
                timeout=TIMEOUT
            )
            assert delete_response.status_code == 200, f"Failed to delete post in cleanup, status: {delete_response.status_code}"

test_updatepost_non_owner_or_unauthenticated_error()