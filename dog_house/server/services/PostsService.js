import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js"
class PostsService{
  async getPostByID(postId) {
  const post = await dbContext.Posts.findById(postId).populate('creator likedCount')
 if (!post){
    throw new BadRequest('not your dog')
  }
  return post
  }

  async createPosts(postData) {
    const newPost = await dbContext.Posts.create(postData)
    await newPost.populate('creator likedCount')
    return newPost
  }

  async getPosts(query) {
    const posts = await dbContext.Posts.find(query).populate('creator likedCount')
    return posts
  }
}

export const postsService = new PostsService()