import config from "../config";

// Users
export const usersData = '/api/users';
export const profileData = '/api/users/{id}';

// Auth
export const loadUserData = '/api/auth';
export const registerUser = '/api/users';
export const loginUser = '/api/auth';

// Posts
export const allPostsData = '/api/posts';
export const singlePostData = '/api/posts/{id}';
export const allTagPostsData = '/api/posts/tag/{tagName}';
export const createSinglePost = '/api/posts';
export const deleteSinglePost = '/api/posts/{id}';

// Answers
export const allAnswersData = '/api/posts/answers/{id}';
export const createSingleAnswer = '/api/posts/answers/{postId}';
export const deleteSingleAnswer = '/api/posts/answers/{AnswerId}';

// Comments
export const allCommentsData = '/api/posts/comments/{id}';
export const createSingleComment = '/api/posts/comments/{postId}';
export const deleteSingleComment = '/api/posts/comments/{CommentId}';

// Tags
export const allTagsData = '/api/tags';
export const singleTagData = '/api/tags/{tagName}';