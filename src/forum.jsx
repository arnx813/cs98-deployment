import React, { useState } from 'react';
import { ChevronUp, MessageSquare, ChevronDown, X, Plus, Minus } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';


const Comment = ({ 
  comment, 
  onReply, 
  depth = 0, 
  activeReplyId, 
  setActiveReplyId 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setActiveReplyId(null);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;
  const isReplying = activeReplyId === comment.id;

  return (
    <div className={`${depth > 0 ? 'ml-2 border-l border-gray-200 pl-1' : ''}`}>
      <div className="flex items-start gap-1">
        <div className="w-4 flex items-center justify-center">
          {hasReplies && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-gray-600"
            >
              {isMinimized ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </button>
          )}
        </div>
        <div className="flex-1  rounded px-1"> { /* Border of each comments/replies */}
          <div className="flex justify-between items-start gap-1">
            <div>
              <span className="text-xs text-gray-900 leading-tight">{comment.text}</span>
              <div className="flex items-center gap-2  ">
                <span className="text-xs text-gray-500">
                  {comment.author} · {comment.timeAgo}
                </span>
                <button
                  onClick={() => {
                    if (isReplying) {
                      setActiveReplyId(null);
                    } else {
                      setActiveReplyId(comment.id);
                      setReplyText('');
                    }
                  }}
                  className="text-xs text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <MessageSquare size={10} className="mr-1" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="flex items-center gap-1 ml-6 mt-0.5">
          <div className="flex-1 items-center h-8">
          <div className="flex gap-1">
            <input
              type="text"
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="comment..."
              className="flex-1 px-4 h-8 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleReply(e);
                }
                if (e.key === 'Escape') {
                    setActiveReplyId(null);
                }
              }}
              autoFocus
            />
            
          </div>
 
          </div>
          <button
              onChange={() => setActiveReplyId(null)}
              className="px-2 h-8 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Reply
          </button>
          <button
            onClick={() => setActiveReplyId(null)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 bg-gray-100 rounded"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {!isMinimized && hasReplies && (
        <div>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ postId, comments, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const [activeReplyId, setActiveReplyId] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim()) {
        onAddComment(postId, {
          id: Date.now(),
          text: newComment,
          author: 'User',
          timeAgo: 'just now',
          replies: []
        });
        setNewComment('');
      }
    };
  
    return (
      <div className="mt-1">
        <form onSubmit={handleSubmit} className="mb-1">
          <div className="flex gap-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 h-8 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-2 h-8 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Comment
            </button>
          </div>
        </form>
  
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={(commentId, text) => {
                onAddComment(postId, {
                  id: Date.now(),
                  text,
                  author: 'User',
                  timeAgo: 'just now',
                  replies: []
                }, commentId);
              }}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
            />
          ))}
        </div>
      </div>
    );
};

const ForumPost = ({ post, onVote, onAddComment }) => {
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
  
    return (
      <div className="border rounded p-2 ">
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <button
              onClick={() => onVote(post.id)}
              className="hover:bg-gray-100 rounded"
            >
              <ChevronUp size={16} className="text-gray-400" />
            </button>
            <span className="text-xs text-gray-600">{post.votes}</span>
          </div>
  
          <div className="flex-1 ">
            <h2 className="text-base font-medium text-gray-900">{post.title}</h2>
            <div className="flex text-xs text-gray-500 ">
              by {post.author} · {post.timeAgo} ·{' '}
              <div className="flex items-center gap-2 inline-flex  ">
                {post.comments.length === 0 ? (
                      <div className="text-xs text-gray-500  ">
       
                          No comments yet - be the first to comment!
                      </div>
                      
                  ) : (
                      <div>
                          {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                      </div>
                  )}

              </div>
              
              <button
                onClick={() => {
                  if (!isCommentsVisible) {
                    setIsCommentsVisible(true);
                    setIsMinimized(false);
                  } else {
                    setIsMinimized(!isMinimized);
                  }
                }}
                className="rounded bg-blue-500 hover:bg-blue-600 flex items-center gap-4 inline-flex rounded mx-4"
              >
                
                {isCommentsVisible && (
                  <span className="flex text-white  ">
                    {isMinimized ? <Plus size={15} className='' /> : <Minus size={15} />}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
  
        {isCommentsVisible && !isMinimized && (
          <div className="ml-6">
            <div className="m-4">
                
                <CommentSection
                  postId={post.id}
                  comments={post.comments}
                  onAddComment={onAddComment}
                />
              </div>
          </div>
        )}
      </div>
    );

};

// Main Forum Component
const Forum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'An update on Dart macros & data serialization',
      author: 'oltman',
      timeAgo: '53 minutes ago',
      votes: 26,
      comments: []
    }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPostTitle.trim()) {
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
        author: 'User',
        timeAgo: 'just now',
        votes: 0,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setShowNewPost(false);
    }
  };

  const handleVote = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, votes: post.votes + 1 } : post
    ));
  };

  const handleAddComment = (postId, newComment, parentCommentId = null) => {
    setPosts(posts.map(post => {
      if (post.id !== postId) return post;

      if (!parentCommentId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }

      const addReply = (comments) => {
        return comments.map(comment => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment]
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: addReply(comment.replies)
            };
          }
          return comment;
        });
      };

      return {
        ...post,
        comments: addReply(post.comments)
      };
    }));
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forum</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800"
        >
          New
        </button>
      </div>

      {showNewPost && (
        <form onSubmit={handleAddPost} className="mb-6">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewPost(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Post
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <ForumPost
            key={post.id}
            post={post}
            onVote={handleVote}
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Forum;