
// pages/posts.js
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import awsExports from '../src/aws-exports';
import { createPost } from '../src/graphql/mutations';
import { listPosts } from '../src/graphql/queries';
import styles from '../styles/Home.module.css';

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });
  const response = await SSR.API.graphql({ query: listPosts });

  return {
    props: {
      posts: response.data.listPosts.items
    }
  };
}

export default function PostList({ posts = [] }) {
  return (
    <div className={styles.grid}>
      <p className={styles.description}>
        <code className={styles.code}>{posts.length}</code>
            posts
      </p>
      {posts.map((post) => (
        <a className={styles.card} href={`/posts/${post.id}`} key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </a>
      ))}
    </div>
  );
}