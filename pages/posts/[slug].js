import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

function PostDetailPage(props) {
  return <PostContent post={props.post}/>;
}

export function getStaticProps(context) {
  const { params } = context;
  console.log(params);
  const { slug } = params;
  console.log(slug);

  const postData = getPostData(slug);
  console.log(postData);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  console.log(postFileNames);

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  console.log(slugs);

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  };
}

export default PostDetailPage;
