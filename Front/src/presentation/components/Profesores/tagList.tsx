const TagList = ({ tags }: { tags: string[] }) => {
    return (
      <div className="grid grid-cols-2 gap-1 justify-center mt-4 max-w-lg mx-auto">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg text-xs font-medium text-center"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };
  
  export default TagList;
  