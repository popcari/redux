import CreatePost from "./components/CreatePost"
import PostList from "./components/PostList"

export default function Blog() {
  return (
    <div className="flex gap-4">
      <PostList />
      <section className="fixed right-0 h-full w-[300px] p-2 bg-slate-300 shadow-2xl">
        <CreatePost />
      </section>
    </div>
  )
}
