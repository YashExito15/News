import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

function AddNews() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const save = async () => {
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        content,
        postedBy: {
          userid: user._id,
          email: user.email,
        },
      };
      await axios.post('/api/newsitems/addnewsitem', payload);
      setLoading(false);
      toast.success('News added successfully');
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">Add News</h1>
      <div className="px-5 pt-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5 mb-2"
          placeholder="Title"
          aria-label="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 mb-2"
          rows="4"
          placeholder="Description"
          aria-label="Description"
        ></textarea>
      </div>
      <div className="px-5">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 mb-2"
          rows="10"
          placeholder="Content"
          aria-label="Content"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button
          className="px-5 py-1 bg-red-700 text-sm text-white"
          onClick={() => navigate(-1)}
        >
          BACK
        </button>
        <button
          className="px-5 py-1 bg-green-500 text-sm text-white"
          onClick={save}
        >
          SAVE
        </button>
      </div>
    </Layout>
  );
}

export default AddNews;
