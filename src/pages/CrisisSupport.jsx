export default function CrisisSupport() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🚨 Support when things feel overwhelming
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        If you’re feeling unsafe, overwhelmed, or unsure what to do next,
        reaching out to a real person can help.
      </p>

      <div className="space-y-4">

        {/* Emergency */}
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-4 rounded-xl">
          <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">
            Immediate danger
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            If you are in immediate danger, please contact local emergency services.
          </p>

          <a
            href="tel:112"
            className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Call Emergency (112)
          </a>
        </div>

        {/* India Helpline */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            🇮🇳 India — Mental Health Support
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Free, confidential support.
          </p>

          <a
            href="tel:9152987821"
            className="inline-block text-indigo-600 dark:text-indigo-400 font-medium"
          >
            Kiran Helpline: 9152987821
          </a>
        </div>

        {/* Reassurance */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            You’re not weak for needing support.  
            Talking to someone is a strong step.
          </p>
        </div>

      </div>
    </div>
  );
}
