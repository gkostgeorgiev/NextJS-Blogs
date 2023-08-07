import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs1",
    title: "Getting started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt: "NextJS is the React framework for production",
    date: "2023-08-07",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt: "NextJS is the React framework for production",
    date: "2023-08-07",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt: "NextJS is the React framework for production",
    date: "2023-08-07",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt: "NextJS is the React framework for production",
    date: "2023-08-07",
  },
];

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}

export default HomePage;
