"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [posts, setPosts] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`/api/users${session?.user.id}/posts`);
			const data = await res.json();

			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async () => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
