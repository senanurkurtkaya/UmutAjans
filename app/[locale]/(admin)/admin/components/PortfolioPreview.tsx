type Props = {
  project: any;
};

export default function PortfolioPreview({ project }: Props) {
  return (
    <div className="border rounded-xl p-6 shadow bg-white">

      {project.cover_image && (
        <img
          src={project.cover_image}
          className="w-full h-60 object-cover rounded mb-4"
        />
      )}

      <h2 className="text-xl font-bold mb-2">
        {project.title || "Proje Başlığı"}
      </h2>

      <p className="text-gray-600 mb-4">
        {project.description || "Proje açıklaması burada görünecek"}
      </p>

      <span className="text-sm text-gray-400">
        {project.category}
      </span>

    </div>
  );
}