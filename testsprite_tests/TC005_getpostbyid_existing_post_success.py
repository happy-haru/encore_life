import requests

BASE_URL = "http://localhost:3000/api/posts"
TIMEOUT = 30

def test_getpostbyid_existing_post_success():
    # First, create a post to ensure an existing post ID is available
    create_url = f"{BASE_URL}/createPost"
    delete_url = f"{BASE_URL}/deletePost"
    get_url = f"{BASE_URL}/getPostById"
    
    # Authentication token placeholder (Replace with valid token if needed)
    # For public access no token required as per PRD
    headers = {}

    # Post data for creation
    post_data = {
        'title': 'Test Post for GetById',
        'content': 'This is a test post content for verifying getPostById endpoint.',
        'category': 'Testing'
    }

    post_id = None
    try:
        # Create the post
        # Use data= to send multipart/form-data fields
        response_create = requests.post(create_url, data=post_data, headers=headers, timeout=TIMEOUT)
        # According to PRD, on success returns HTTP 303 redirect to category page
        assert response_create.status_code == 303, f"Expected 303 on post creation, got {response_create.status_code}"
        
        # The new post ID is not returned directly;
        # So we need to get the posts by category to find the post and extract its id
        # Use getPostsByCategory to find the newly created post
        get_cat_url = f"{BASE_URL}/getPostsByCategory"
        params_cat = {'category': post_data['category']}
        response_cat = requests.get(get_cat_url, params=params_cat, timeout=TIMEOUT)
        assert response_cat.status_code == 200, f"Expected 200 when getting posts by category, got {response_cat.status_code}"
        posts = response_cat.json()
        # Find the post by title and content matching exactly (assuming unique)
        matching_posts = [post for post in posts if post.get('title') == post_data['title'] and post.get('content') == post_data['content']]
        assert matching_posts, "Created post not found in posts by category."
        post_id = matching_posts[0].get('id')
        assert post_id, "Post ID missing in the post data."
        
        # Now call getPostById with the found post id
        params_get = {'id': post_id}
        response_get = requests.get(get_url, params=params_get, timeout=TIMEOUT)
        assert response_get.status_code == 200, f"Expected 200 fetching post by ID, got {response_get.status_code}"
        post_detail = response_get.json()
        assert post_detail.get('id') == post_id, "Post ID in response does not match requested ID."
        assert post_detail.get('title') == post_data['title'], "Post title does not match."
        assert post_detail.get('content') == post_data['content'], "Post content does not match."
        assert post_detail.get('category') == post_data['category'], "Post category does not match."
    
    finally:
        # Cleanup: delete the created post to avoid test pollution
        if post_id:
            # Delete requires id and category query params and authentication (assumed no auth passes here)
            params_delete = {'id': post_id, 'category': post_data['category']}
            try:
                response_delete = requests.delete(delete_url, params=params_delete, timeout=TIMEOUT)
                # According to PRD, on success returns 200
                assert response_delete.status_code == 200, f"Expected 200 deleting post, got {response_delete.status_code}"
            except Exception:
                pass

test_getpostbyid_existing_post_success()
