export default function FeatureCard({ href, title, desc, highlight }) {
  return (
    <a
      href={href}
      className={`block rounded-xl p-5 transition border
        ${
          highlight
            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        }
        hover:shadow-md`}
    >
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        {desc}
      </p>
    </a>
  );
}
