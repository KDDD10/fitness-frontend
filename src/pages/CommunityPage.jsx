import React, { useState } from "react";
import { Modal, Button, Input, notification } from "antd";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Sara from "../images/sara.jpg";
import John from "../images/john.jpg";
const { TextArea } = Input;

const initialStories = [
  {
    id: 1,
    name: "John Doe",
    story:
      "John lost 50lbs in 6 months with our program. He is now running marathons and leading a healthy lifestyle!",
    imageUrl: Sara,
    comments: [
      { id: 1, username: "Mike", text: "Great job, John! Very inspiring!" },
    ],
  },
  {
    id: 2,
    name: "Sara Smith",
    story:
      "Sara gained 20lbs of muscle in 8 months with our muscle gain program. She feels more confident than ever!",
    imageUrl: John,
    comments: [
      { id: 1, username: "Emily", text: "You’re amazing, Sara! Keep it up!" },
    ],
  },
];

const CommunityPage = () => {
  const [stories, setStories] = useState(initialStories);
  const [newPost, setNewPost] = useState({ name: "", story: "", imageUrl: "" });
  const [newComment, setNewComment] = useState({ storyId: null, text: "" });
  const [isSubscriber, setIsSubscriber] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle opening and closing of modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle submitting a new post (for subscribers only)
  const handlePostSubmit = () => {
    notification.success({
      message: "your post sent for approval",
    });
    // const newStory = {
    //   id: stories.length + 1,
    //   ...newPost,
    //   comments: [],
    // };
    // setStories([...stories, newStory]);
    // setNewPost({ name: "", story: "", imageUrl: "" });
    // // Close the modal after submission
    setIsModalVisible(false);
  };

  // Handle posting a new comment
  const handleCommentSubmit = (storyId) => {
    const updatedStories = stories.map((story) => {
      if (story.id === storyId) {
        return {
          ...story,
          comments: [
            ...story.comments,
            {
              id: story.comments.length + 1,
              username: "User",
              text: newComment.text,
            },
          ],
        };
      }
      return story;
    });
    setStories(updatedStories);
    setNewComment({ storyId: null, text: "" });
  };

  return (
    <>
      <Navigation />
      <div className="bg-gray-100 pb-16">
        {/* Page Header */}

        <PageHeader
          heading="Welcome to Our Community"
          subheading="Join our community, share your success, and support each other!"
        />

        {/* Post Updates Section (Subscribers Only) */}
        {isSubscriber && (
          <div className="max-w-3xl mx-auto mb-12 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold mb-4">
                Share Your Story, Inspire Other
              </h2>
              <Button type="primary" onClick={showModal}>
                Post Your Story
              </Button>
            </div>
            {/* Ant Design Modal */}
            <Modal
              title="Post Your Success Story"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handlePostSubmit}>
                  Post Story
                </Button>,
              ]}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <Input
                  value={newPost.name}
                  onChange={(e) =>
                    setNewPost({ ...newPost, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Story
                </label>
                <TextArea
                  value={newPost.story}
                  onChange={(e) =>
                    setNewPost({ ...newPost, story: e.target.value })
                  }
                  placeholder="Share your success story"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <Input
                  value={newPost.imageUrl}
                  onChange={(e) =>
                    setNewPost({ ...newPost, imageUrl: e.target.value })
                  }
                  placeholder="Enter image URL"
                />
              </div>
            </Modal>
          </div>
        )}

        {/* Success Stories Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Community Success Stories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={story.imageUrl}
                  alt={story.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">{story.name}</h3>
                  <p className="text-gray-600 mb-4">{story.story}</p>

                  {/* Comments Section */}
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Comments</h4>
                    {story.comments.map((comment) => (
                      <div key={comment.id} className="mb-2">
                        <p>
                          <strong>{comment.username}</strong>: {comment.text}
                        </p>
                      </div>
                    ))}

                    {/* Add New Comment */}
                    <div className="mt-4">
                      <TextArea
                        value={
                          newComment.storyId === story.id ? newComment.text : ""
                        }
                        onChange={(e) =>
                          setNewComment({
                            storyId: story.id,
                            text: e.target.value,
                          })
                        }
                        placeholder="Add a comment..."
                        rows={2}
                      />
                      <Button
                        className="mt-2"
                        type="primary"
                        onClick={() => handleCommentSubmit(story.id)}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityPage;
