import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from "axios";
import NewTweet from "../components/NewTweet";
import UserCard from "../components/UserCard"
import { globalUser } from "../helper/helper";
import InfiniteScroll from 'react-infinite-scroll-component';

// Lazy load the Tweet component
const Tweet = lazy(() => import('../components/Tweet'));

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("latest");
    const [keyword, setKeyword] = useState("");
    const [postCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);  // Page state for pagination
    const url = process.env.REACT_APP_API_URL || "https://localhost:5000/api/";

    const api = axios.create({
        baseURL: `${url}`, 
    });

    useEffect(() => { 
        fetchPosts(page);
    }, [page, sort, keyword]); //Trigger fetch whenever this parameters change

    const fetchPosts = async () => {
        const response = await api.get(`${url}posts`, {
            params: {
                sort: sort,
                keyword: keyword,
                page: page,
                pageSize: 15
            }
        },
            {
                withCredentials: true
            });
            if (page === 1) {
                setPosts(response.data.posts);  // Initial page, set posts
                setTotalCount(response.data.totalPosts);  // Set the total number of posts
            } else {
                setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);  // Append new posts
            }
    };

    const fetchMorePosts = () => {
        setPage((prevPage) => prevPage + 1);  // Increment the page to load more posts
    };

    return (
        <div style={{ marginTop: '16px' }}>
            <div style={styles.container}>
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={styles.searchInput}
                />
                <button onClick={() => setSort("latest")} style={styles.searchButton}>Latest</button>
                <button onClick={() => setSort("trending")} style={styles.searchButton}>Trending</button>
                <UserCard user={globalUser} postCount={postCount}/>
            </div>
            <NewTweet />

            <InfiniteScroll
                dataLength={posts.length} // Current number of posts
                next={fetchMorePosts} // Function to fetch more posts
                hasMore={true} // Assume there are always more posts for now
                loader={<div>Loading more tweets...</div>}
                endMessage={<div>No more tweets!</div>}
            >
                <ul style={{ paddingInlineStart: 0 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {posts.map((post) => (
                            <Tweet key={post.id}
                                username={post.user.username}
                                userId={post.user.id}
                                content={post.content}
                                createdAt={post.createdAt}
                                initialRetweets={post.repostCount}
                                initialLikes={0}
                                repostId={post.id}
                            />
                        ))}
                    </Suspense>
                </ul>
            </InfiniteScroll>
        </div>
    );
};

const styles = {
    searchInput: {
        padding: '10px',
        width: '250px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    searchButton: {
        width: '85px',
        borderRadius: '5px',
        border: 'none',
        padding: '10px 10px',
        cursor: 'pointer',
        margin: '4px',
        backgroundColor: '#1DA1F2',
        color: 'white',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '550px',
        // width: '500px',
        margin: '2 auto',
    },
};

export default HomePage;