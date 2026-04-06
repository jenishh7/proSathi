import { MainLayout } from "../components/Layout";
import { HelpCircle, MessageCircle, FileText, Mail } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'To reset your password, go to Settings and click "Change Password". Follow the prompts to verify your identity and set a new password.',
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team via email at support@prosathi.com or use the live chat feature available in the bottom right corner.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes! Go to Settings > Data & Privacy to download your data in CSV format. The export includes all your reports and activity logs.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, debit cards, and digital payment methods including PayPal and Google Pay.",
    },
    {
      question: "How do I upgrade my plan?",
      answer:
        "Visit the Billing section in your account settings to view available plans and upgrade your subscription.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! We use industry-leading encryption and security measures to protect your data. All data is backed up multiple times daily.",
    },
  ];

  const resources = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Read our comprehensive guides and tutorials",
      link: "#",
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to common questions",
      link: "#",
    },
    {
      icon: MessageCircle,
      title: "Live Support",
      description: "Chat with our support team",
      link: "#",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email at support@prosathi.com",
      link: "mailto:support@prosathi.com",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">
            Help & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find answers and get help with your account.
          </p>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <a
                key={resource.title}
                href={resource.link}
                className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900 p-6 hover:shadow-lg dark:hover:shadow-gray-700 transition text-center"
              >
                <Icon className="mx-auto text-brand-orange mb-4" size={32} />
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {resource.description}
                </p>
              </a>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <h2 className="text-lg font-bold text-brand-navy dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer group"
              >
                <summary className="font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-between">
                  {faq.question}
                  <span className="transform group-open:rotate-180 transition text-gray-400 dark:text-gray-500">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900 p-6">
          <h2 className="text-lg font-bold text-brand-navy dark:text-white mb-6">
            Still need help?
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                placeholder="Describe your issue..."
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Help;
