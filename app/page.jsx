"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(false)

  const inputRef = useRef("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('posts server error', error.message)
      }
    }
    fetchData();
  }, [])

  const searchPost = (e) => {
    if(e.type == 'keydown' && e.key !== 'Enter'){
      return;
    }else{
      setSearch(true);
      fetch(process.env.NEXT_PUBLIC_API_URL + '/posts?q=' + inputRef.current.value)
      .then((res) => res.json())
      .then(res => setPosts(res))
      .finally(() => setSearch(false))
    }
  }

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Blog</h2>
        <p>Read Latest blogs</p>
      </main>
      <div className="flex justify-end px-4">
        <input type="text" onKeyDown={searchPost} ref={inputRef} className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button onClick= {searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{search ? '...': 'Search'}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link href={"/post/"+ post._id}>
            <div className="border border-gray-200 p-4" >
              <img className="w-full h-80 object-cover mb-4" src={post.Image} alt="Post Image" />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {posts.length < 1 && inputRef.current.value && <p>No search results found for this : {inputRef.current.value}</p>}
      </div>
    </>
  );
}
