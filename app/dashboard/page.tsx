const Dashboard = () => {
  const chatHistory = [
    { role: "user", content: "Hello, AI!" },
    { role: "ai", content: "Hello! How can I assist you today?" },
    { role: "user", content: "Can you explain quantum computing?" },
    {
      role: "ai",
      content:
        "Certainly! Quantum computing is a type of computation that harnesses the unique properties of quantum mechanics...",
    },
    {
      role: "user",
      content:
        "That's interesting. How does it differ from classical computing?",
    },
    {
      role: "ai",
      content:
        "The main difference between quantum and classical computing lies in how information is processed...",
    },
    {
      role: "user",
      content: "What are some practical applications of quantum computing?",
    },
    {
      role: "ai",
      content:
        "Quantum computing has several potential applications across various fields...",
    },
    {
      role: "user",
      content: "Are there any limitations to quantum computing?",
    },
    {
      role: "ai",
      content:
        "Yes, there are several challenges and limitations in quantum computing...",
    },
    { role: "user", content: "Thank you for the explanation!" },
    {
      role: "ai",
      content:
        "You're welcome! I'm glad I could help explain quantum computing. Do you have any more questions?",
    },
  ];

  return (
    <div className="flex flex-col h-[80vh] py-4 bg-green-200">
      <div className="flex-1 mx-4 bg-white rounded-lg overflow-hidden">
        <div className="h-full flex flex-col p-4">
          <div className="flex-1 overflow-y-auto border border-gray-300 rounded mb-4">
            {/* Chat history displayed here */}
            <div className="space-y-2 p-4">
              {chatHistory.map((message, index) => (
                <div key={index} className="px-10">
                  <p className="">{message.role === "user" ? "User:" : "AI:"}</p>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <textarea
              className="w-full border px-1"
              placeholder="prompt"
              rows={3}
            />
            </div>
            <div className="p-2">
              <button className=" px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600">
                Ask AI
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
