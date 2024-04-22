// components/RecentPostsCard.js
const RecentPostsCard = () => {
    return (
      <div className="bg-white dark:bg-stone-900 dark:text-stone-100  p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <ul>
          <li>Post 1</li>
          <li>Post 2</li>
          <li>Post 3</li>
          {/* Add more recent posts */}
        </ul>
      </div>
    );
  };
  
  export default RecentPostsCard;
  