class postModel {
    constructor(post) {
        this.content = post.content;
        this.userName = post.userName;
        this.user_id = post.user_id;
        this.created_at = post.created_at || new Date();
    }
}

export default postModel;