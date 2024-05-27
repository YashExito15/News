import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

function NewsDesc() {
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState('');
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:5000/api/newsitems/getnewsitembyid/${params.newsid}`);
        setNewsItem(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load news item. Please try again later.');
        setLoading(false);
      }
    };

    getData();
  }, [params.newsid]);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="p-5 text-red-500">{error}</div>
      ) : newsItem ? (
        <div className="p-5">
          <h1 className="my-3 text-2xl font-semibold">{newsItem.title}</h1>
          <hr />
          <p>{newsItem.description}</p>
          <hr />
          <p>{newsItem.content}</p>
          <hr />
          <p>{newsItem.postedBy.email}</p>
          <hr />
        </div>
      ) : (
        <div className="p-5">No news item found.</div>
      )}
    </Layout>
  );
}

export default NewsDesc;
