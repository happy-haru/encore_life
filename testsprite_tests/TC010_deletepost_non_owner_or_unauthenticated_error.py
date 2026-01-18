import requests

BASE_URL = "http://localhost:3000/api"
TIMEOUT = 30

def test_deletepost_non_owner_or_unauthenticated_error():
    # Sample post data for creation by owner
    create_post_data = {
        'title': 'Test Post For Delete Ownership',
        'content': 'Content for ownership test.',
        'category': 'test-category'
    }
    # Authentication tokens (for demonstration; replace with valid tokens as needed)
    owner_auth_headers = {
        'Authorization': 'Bearer owner_valid_token'
    }
    non_owner_auth_headers = {
        'Authorization': 'Bearer non_owner_valid_token'
    }
    # No auth headers for unauthenticated case
    no_auth_headers = {}

    # Step 1: Create a post as the owner (authenticated)
    post_id = None
    try:
        create_response = requests.post(
            f"{BASE_URL}/createPost",
            files={key: (None, value) for key, value in create_post_data.items()},
            headers=owner_auth_headers,
            timeout=TIMEOUT
        )
        assert create_response.status_code == 303, f"Expected 303 on create, got {create_response.status_code}"
        # There may not be post ID in response; fetch posts by category and find the newly created one to get ID
        get_posts_response = requests.get(
            f"{BASE_URL}/getPostsByCategory",
            params={'category': create_post_data['category']},
            timeout=TIMEOUT
        )
        assert get_posts_response.status_code == 200
        posts = get_posts_response.json()
        # Find the post we just created by title and content
        matching_posts = [p for p in posts if p.get('title') == create_post_data['title'] and p.get('content') == create_post_data['content']]
        assert matching_posts, "Created post not found in list"
        post_id = matching_posts[0]['id']

        # Step 2: Attempt to delete the post as a non-owner authenticated user
        delete_response_non_owner = requests.delete(
            f"{BASE_URL}/deletePost",
            params={'id': post_id, 'category': create_post_data['category']},
            headers=non_owner_auth_headers,
            timeout=TIMEOUT
        )
        # Expect denial of deletion, likely a 500 error or an error in response body
        assert delete_response_non_owner.status_code != 200, "Non-owner should not be able to delete post"

        # Step 3: Attempt to delete the post unauthenticated
        delete_response_unauth = requests.delete(
            f"{BASE_URL}/deletePost",
            params={'id': post_id, 'category': create_post_data['category']},
            headers=no_auth_headers,
            timeout=TIMEOUT
        )
        # Expect denial with error (likely 500 or other error code)
        assert delete_response_unauth.status_code != 200, "Unauthenticated user should not delete post"

        # Step 4: Verify the post still exists after deletion attempts
        get_post_response = requests.get(
            f"{BASE_URL}/getPostById",
            params={'id': post_id},
            timeout=TIMEOUT
        )
        assert get_post_response.status_code == 200, "Post should still exist after failed delete attempts"
        post_data = get_post_response.json()
        assert post_data.get('id') == post_id, "Returned post ID does not match expected"

    finally:
        # Cleanup: delete the post as owner to clean test data
        if post_id:
            requests.delete(
                f"{BASE_URL}/deletePost",
                params={'id': post_id, 'category': create_post_data['category']},
                headers=owner_auth_headers,
                timeout=TIMEOUT
            )

test_deletepost_non_owner_or_unauthenticated_error()
