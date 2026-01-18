import requests
import uuid

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_getpostbyid_existing_post():
    # Setup: Create a post to ensure existence
    create_url = f"{BASE_URL}/createPost"
    post_data = {
        'title': 'Test Post for GetById',
        'content': 'This is content for the GetById test post.',
        'category': 'test-category'
    }
    headers = {}  # No auth specified as getPostById is public; but createPost requires auth. 
    # Since auth is required for createPost and no auth instructions provided,
    # assumption: no auth headers available. We can't create post in this case.
    # So we attempt to create with an unauthenticated user - will fail.
    # To follow instructions, we have to create a post to get a valid post ID.
    # However, PRD notes authenticated user required for createPost.
    # Given no auth info or token, we have to skip createPost or use a known post ID.
    # Instruction: "If resource ID is not provided, create a new resource and use try-finally to delete after test"
    # We need to simulate authentication. Since no auth info given, we can assume no authentication possible.
    # We can proceed by attempting to find an existing post by fetching posts by category or skipping creation.
    # However, the PRD does not specify an open public post creation endpoint.
    # Given that, we take the approach to try to fetch posts by category to find an existing post ID to test with.
    
    try:
        # Get posts in 'test-category' to find an existing post
        get_posts_url = f"{BASE_URL}/getPostsByCategory"
        params = {'category': 'test-category'}
        resp = requests.get(get_posts_url, params=params, timeout=TIMEOUT)
        resp.raise_for_status()
        posts = resp.json()
        if not posts or not isinstance(posts, list):
            raise AssertionError("No posts found in 'test-category' to test getPostById")
        post_id = posts[0].get('id')
        assert post_id is not None, "Post ID missing in getPostsByCategory response"

        # Now test fetching the post by id
        get_post_url = f"{BASE_URL}/getPostById"
        resp = requests.get(get_post_url, params={'id': post_id}, timeout=TIMEOUT)
        resp.raise_for_status()
        post_detail = resp.json()

        # Validate the returned post has correct details
        assert post_detail.get('id') == post_id, "Returned post ID does not match requested ID"
        for field in ('title', 'content', 'category'):
            assert field in post_detail, f"Field '{field}' missing in post details"
            assert isinstance(post_detail[field], str), f"Field '{field}' should be a string"
    except requests.exceptions.RequestException as e:
        assert False, f"HTTP request failed: {e}"

test_getpostbyid_existing_post()