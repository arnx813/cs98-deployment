import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Input } from "./components/ui/input";

const Response = ({ response, datasetId, onDelete }) => {
  return (
    <div className="ml-8 border-l border-gray-200 pl-4 my-2">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-gray-900">{response.content}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {response.username} ·{" "}
              {new Date(response.timestamp).toLocaleString()}
            </span>

            <button
              onClick={() => {
                console.log("cough ", response);
                onDelete(datasetId, response.forumID);
              }}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
        {/* in case you want something to the far right */}
        {/* <div className="flex items-center gap-1">
        </div> */}
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
  onDeleteResponse,
}) => {
  const [isResponsesVisible, setIsResponsesVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newResponse, setNewResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newResponse.trim()) {
      await onAddResponse(datasetId, post.forumID, newResponse);
      setNewResponse("");
    }
  };

  return (
    <div className="border rounded p-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => onVote(datasetId, post.forumID, "upvote")}
            className="hover:bg-gray-100 rounded p-1"
          >
            <ChevronUp size={16} className="text-gray-400" />
          </button>
          <span className="text-xs text-gray-600">{post.upvotes}</span>
          <button
            onClick={() => onVote(datasetId, post.forumID, "downvote")}
            className="hover:bg-gray-100 rounded p-1"
          >
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-gray-900">
              {post.title}
            </h2>

            <button
              onClick={() => onDelete(datasetId, post.forumID)}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
          <span className="text-sm text-gray-700 mt-1">{post.content}</span>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            by {post.username} · {new Date(post.timestamp).toLocaleString()} ·
            <button
              className="text-blue-500 hover:text-blue-600 hover:underline"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              reply
            </button>{" "}
            ·
            <button
              onClick={() => setIsResponsesVisible(!isResponsesVisible)}
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              {responses.length}{" "}
              {responses.length === 1 ? "response" : "responses"}
            </button>
          </div>
        </div>
      </div>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="ml-8">
          <div className="flex gap-2">
            <Input
              type="text"
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              placeholder="Add a response..."
              className="flex-1 px-4 h-8 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                setNewResponse("");
                setIsFormVisible(!isFormVisible);
              }}
              className="px-4 h-8 text-xs bg-gray-400 text-white rounded hover:bg-blue-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                setIsResponsesVisible(!isResponsesVisible);
              }}
              className="px-4 h-8 text-xs bg-gray-700 text-white rounded hover:bg-blue-600"
            >
              Reply
            </button>
          </div>
        </form>
      )}

      {isResponsesVisible && (
        <div className="mt-4">
          {responses.map((response, index) => (
            <Response
              key={`${post.forumID}-${
                response.responseId || `response-${index}`
              }`}
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
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [upvoteStatus, setUpvoteStatus] = useState({});
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    fetchPosts();
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

      const forumIds = data.map((post) => post.forumID);
      console.log("Forum IDs to be sent:", forumIds); // Debug log

      const session = await fetchAuthSession();
      const idToken = session.tokens.idToken;

      // Let's verify what we're sending
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forumIds), // Send the array directly as JSON
      };

      console.log("Request options:", {
        ...requestOptions,
        body: JSON.parse(requestOptions.body), // Log the parsed body for readability
      });

      const upvoteResponse = await fetch(
        "http://localhost:8080/api/secure/discussions/hasUpvotedOrDownvoted",
        requestOptions
      );

      if (!upvoteResponse.ok) {
        const errorText = await upvoteResponse.text();
        console.error("Response error:", {
          status: upvoteResponse.status,
          headers: Object.fromEntries([...upvoteResponse.headers]),
          error: errorText,
        });
        throw new Error(
          `Failed to fetch upvote response: ${upvoteResponse.status} - ${errorText}`
        );
      }

      const upvoteData = await upvoteResponse.json();
      const statusMap = {};
      forumIds.forEach((id, index) => {
        statusMap[id] = upvoteData[index];
      });
      setUpvoteStatus(statusMap);

      await Promise.all(data.map((post) => fetchResponses(post.forumID)));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchResponses = async (forumId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/public/discussions/${datasetID}/forum/${forumId}/responses`
      );
      const data = await response.json();
      setResponses((prev) => ({
        ...prev,
        [forumId]: data,
      }));
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (newPostTitle.trim() && newPostContent.trim()) {
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
        submissionData.append("datasetId", datasetID);
        submissionData.append("content", newPostContent);
        submissionData.append("title", newPostTitle);

        const response = await fetch(
          "http://localhost:8080/api/secure/discussions/createForum",
          {
            method: "POST",
            headers: headers,
            body: submissionData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to create forum post: ${response.status}`);
        }

        setNewPostTitle("");
        setNewPostContent("");
        setShowNewPost(true);
        fetchPosts(); // Refresh posts
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleVote = async (datasetId, forumId, voteType) => {
    try {
      console.log(forumId);
      const session = await fetchAuthSession();
      console.log(datasetID, newPostTitle, newPostContent);

      const sessionId2 = session.tokens.idToken.toString();
      setSessionId(sessionId2);

      console.log("session", session);

      // Let's verify what we're sending
      const headers = {
        Authorization: "Bearer " + sessionId2,
      };

      const response = await fetch(
        `http://localhost:8080/api/secure/discussions/${datasetId}/${forumId}/${voteType}`,
        {
          method: "POST",
          headers: headers,
        }
      );
      const changeAmount = await response.json();
      console.log(changeAmount);
      // Update the posts with the new vote count
      setPosts(
        posts.map((post) =>
          post.forumId === forumId
            ? { ...post, upvotes: post.upvotes + changeAmount }
            : post
        )
      );
      fetchPosts();
      // Update the upvote status
      setUpvoteStatus((prev) => ({
        ...prev,
        [forumId]: voteType === "upvote" ? "upvoted" : "downvoted",
      }));
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleAddResponse = async (datasetID, forumId, content) => {
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
      submissionData.append("datasetId", datasetID);
      submissionData.append("content", content);
      submissionData.append("forumId", forumId);
      await fetch(
        "http://localhost:8080/api/secure/discussions/createResponse",
        {
          method: "POST",
          headers: headers,

          body: submissionData,
        }
      );
      fetchResponses(forumId);
    } catch (error) {
      console.error("Error creating response:", error);
    }
  };

  const handleDeletePost = async (datasetId, forumId) => {
    try {
      const session = await fetchAuthSession();
      const sessionId2 = session.tokens.idToken.toString();
      setSessionId(sessionId2);

      const headers = {
        Authorization: "Bearer " + sessionId2,
      };

      const submissionData = new FormData();
      submissionData.append("datasetId", datasetId);
      submissionData.append("forumId", forumId);

      await fetch("http://localhost:8080/api/secure/discussions/deleteForum", {
        method: "DELETE",
        headers: headers,
        body: submissionData,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteResponse = async (datasetId, forumId) => {
    try {
      const session = await fetchAuthSession();
      const sessionId2 = session.tokens.idToken.toString();
      setSessionId(sessionId2);

      const headers = {
        Authorization: "Bearer " + sessionId2,
      };
      const submissionData = new FormData();
      submissionData.append("datasetId", datasetId);
      submissionData.append("forumId", forumId);

      await fetch(
        "http://localhost:8080/api/secure/discussions/deleteResponse",
        {
          method: "DELETE",
          headers: headers,
          body: submissionData,
        }
      );
      const originalForumId = forumId.split("_")[0];
      fetchResponses(originalForumId);
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discussion</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="px-4 py-2 bg-[#642DFF] text-white rounded-full hover:bg-[#5a26e0]"
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
              className="px-4 py-2 bg-[#000000] text-white rounded-full hover:bg-[#414141]"
            >
              Create Post
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <ForumPost
            key={`post-${post.forumID}`}
            post={post}
            datasetId={datasetID}
            onVote={handleVote}
            onAddResponse={handleAddResponse}
            onDelete={handleDeletePost}
            responses={responses[post.forumID] || []}
            onDeleteResponse={handleDeleteResponse}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No posts yet. Be the first to create one!</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Forum;
