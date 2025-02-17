import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { fetchAuthSession } from "aws-amplify/auth";

const Response = ({ response, datasetId, onDelete }) => {
  return (
    <div className="ml-8 border-l border-gray-200 pl-4 my-2">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-gray-900">{response.content}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {response.username} · {new Date(response.timestamp).toLocaleString()}
            </span>
            {response.canDelete && (
              <button
                onClick={() => onDelete(datasetId, response.forumId)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">{response.upvotes}</span>
        </div>
      </div>
    </div>
  );
};

const ForumPost = ({ 
  post, 
  datasetId,
  onVote, 
  onAddResponse,
  onDelete,
  responses,
  onDeleteResponse
}) => {
  const [isResponsesVisible, setIsResponsesVisible] = useState(false);
  const [newResponse, setNewResponse] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newResponse.trim()) {
      await onAddResponse(datasetId, post.forumId, newResponse);
      setNewResponse('');
    }
  };

  return (
    <div className="border rounded p-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => onVote(datasetId, post.forumId, 'upvote')}
            className="hover:bg-gray-100 rounded p-1"
          >
            <ChevronUp size={16} className="text-gray-400" />
          </button>
          <span className="text-xs text-gray-600">{post.upvotes}</span>
          <button
            onClick={() => onVote(datasetId, post.forumId, 'downvote')}
            className="hover:bg-gray-100 rounded p-1"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-gray-900">{post.title}</h2>
            {post.canDelete && (
              <button
                onClick={() => onDelete(datasetId, post.forumId)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-sm text-gray-700 mt-1">{post.content}</p>
          <div className="flex text-xs text-gray-500 mt-2">
            by {post.username} · {new Date(post.timestamp).toLocaleString()}
          </div>
          
          <button
            onClick={() => setIsResponsesVisible(!isResponsesVisible)}
            className="text-xs text-blue-500 hover:text-blue-600 mt-2"
          >
            {responses.length} {responses.length === 1 ? 'response' : 'responses'}
          </button>
        </div>
      </div>

      {isResponsesVisible && (
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="Add a response..."
                className="flex-1 px-4 h-8 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 h-8 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reply
              </button>
            </div>
          </form>

          {responses.map((response) => (
            <Response
              key={response.forumId}
              response={response}
              datasetId={datasetId}
              onDelete={onDeleteResponse}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Forum = ({ datasetID }) => {
  const [posts, setPosts] = useState([]);
  const [responses, setResponses] = useState({});
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [upvoteStatus, setUpvoteStatus] = useState({});
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    //fetchPosts();
    console.log("this is it ", datasetID)
    // You might want to set up a polling mechanism or websocket
    // to keep the posts updated in real-time
  }, [datasetID]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/public/discussions/${datasetID}/forums`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch all dataset IDs");
      }
 
      const data = await response.json();
      setPosts(data);

      // Fetch upvote status for all posts

      const forumIds = data.map(post => post.forumId);

      const upvoteResponse = await fetch('http://localhost:3000/api/secure/discussions/hasUpvotedOrDownvoted');
      if  (!upvoteResponse) {
        throw new Error("Failed to fetch upvote response")
      }
      
      const upvoteData = await upvoteResponse.json();
      const statusMap = {};
      forumIds.forEach((id, index) => {
        statusMap[id] = upvoteData[index];
      });
      setUpvoteStatus(statusMap);
      
      // Fetch responses for each post
      await Promise.all(data.map(post => fetchResponses(post.forumId)));
    } catch (error) {
      console.error('Error fetching posts hrere :', error);
    }
  };

  const fetchResponses = async (forumId) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/public/discussions/${datasetID}/forum/${forumId}/responses`
        );
        const data = await response.json();
        setResponses(prev => ({
            ...prev,
            [forumId]: data
        }));
    } catch (error) {
        console.error('Error fetching responses:', error);
    }
};


const handleAddPost = async (e) => {
  e.preventDefault();
  
  if (newPostTitle.trim() && newPostContent.trim()) {
    // console.log(datasetID, newPostTitle, newPostContent);
      try {
       const session = await fetchAuthSession();
       console.log(datasetID, newPostTitle, newPostContent);

       const sessionId2 = session.tokens.idToken.toString();
       setSessionId(sessionId2);
       
      console.log("session", session);
 
      const headers = {
        Authorization: "Bearer " + sessionId2,
      };

      const submissionData = new FormData();
      submissionData.append("datasetId", "testID");
      submissionData.append("content", "test");
      submissionData.append("title", "test");



      

      const response = await fetch(
        "http://localhost:8080/api/secure/discussions/createForum",
        {
          method: "POST",
          headers: headers,
          body: submissionData
        }
      );
      

          if (!response.ok) {
              throw new Error(`Failed to create forum post: ${response.status}`);
          }

          setNewPostTitle('');
          setNewPostContent('');
          setShowNewPost(true);
          fetchPosts();  // Refresh posts
      } catch (error) {
          console.error('Error creating post:', error);
      }
  }
};


  const handleVote = async (datasetId, forumId, voteType) => {
    try {
      const response = await fetch(`/api/secure/discussions/${datasetId}/${forumId}/${voteType}`, {
        method: 'POST'
      });
      const changeAmount = await response.json();
      
      // Update the posts with the new vote count
      setPosts(posts.map(post => 
        post.forumId === forumId 
          ? { ...post, upvotes: post.upvotes + changeAmount } 
          : post
      ));
      
      // Update the upvote status
      setUpvoteStatus(prev => ({
        ...prev,
        [forumId]: voteType === 'upvote' ? 'upvoted' : 'downvoted'
      }));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleAddResponse = async (datasetId, forumId, content) => {
    try {
      await fetch('/api/secure/discussions/createResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          datasetId: datasetId,
          forumId: forumId,
          content: content
        })
      });
      fetchResponses(forumId);
    } catch (error) {
      console.error('Error creating response:', error);
    }
  };

  const handleDeletePost = async (datasetId, forumId) => {
    try {
      await fetch('/api/secure/discussions/deleteForum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          datasetId: datasetId,
          forumId: forumId
        })
      });
      //fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteResponse = async (datasetId, forumId) => {
    try {
      await fetch('/api/secure/discussions/deleteResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          datasetId: datasetId,
          forumId: forumId
        })
      });
      const originalForumId = forumId.split('_')[0];
      fetchResponses(originalForumId);
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discussion</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Post
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
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Enter post content..."
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewPost(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Post
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <ForumPost
            key={post.forumId}
            post={post}
            datasetId={datasetID}
            onVote={handleVote}
            onAddResponse={handleAddResponse}
            onDelete={handleDeletePost}
            responses={responses[post.forumId] || []}
            onDeleteResponse={handleDeleteResponse}
          />
        ))}
      </div>
    </div>
  );
};

export default Forum;