
"use client"

import React, { useState, useEffect } from 'react'

const page = ({ params }) => {

    const id = params.id;

    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/post/' + id);
                const data = await response.json();
                setPost(data);
                console.log('data', data)
            } catch (error) {
                console.error('posts server error', error.message)
            }
        }
        fetchData();
    }, [])
    return (
        <>
        {post &&
            <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
                <p className="text-gray-500">Published on {post.created_at_formatted}</p>
                <img src={post.Image} alt="Post Image" className="my-4" />
                <p>{post.description}</p>
            </main>
        }
        </>
    )
}

export default page