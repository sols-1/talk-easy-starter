
// Collection of conversation starters by category
const conversationStarters = {
  general: [
    "What's the most interesting thing you've read or seen recently?",
    "If you could have dinner with any historical figure, who would it be and why?",
    "What's something you're looking forward to in the coming year?",
    "If you could master any skill instantly, what would you choose?",
    "What's a place you've always wanted to visit but haven't had the chance yet?",
    "What's your favorite way to spend a rainy day?",
    "If you could live in any fictional world, which would you choose?",
    "What's a small thing that always brightens your day?",
    "What's something you've changed your mind about in the last few years?",
    "If you could solve one global problem instantly, which would you choose?"
  ],
  work: [
    "What's the most rewarding project you've worked on?",
    "What's a skill you'd like to develop further in your professional life?",
    "How do you stay productive during busy periods?",
    "What's the best piece of career advice you've received?",
    "How do you approach work-life balance?",
    "What workplace culture elements do you find most important?",
    "How do you handle difficult feedback or criticism?",
    "What industry trends are you most excited about?",
    "What's your approach to professional networking?",
    "How do you stay motivated on challenging projects?"
  ],
  hobbies: [
    "What hobby would you pursue if time and money were no object?",
    "What's a hobby that taught you something unexpected about yourself?",
    "Have you picked up any new interests recently?",
    "What activity makes you lose track of time?",
    "Is there a hobby you enjoyed as a child that you'd like to revisit?",
    "What's something creative you enjoy doing?",
    "How do your hobbies affect other aspects of your life?",
    "Do you prefer solo activities or group hobbies?",
    "What's a hobby you'd recommend to others and why?",
    "Is there a hobby or skill you admire in others?"
  ],
  entertainment: [
    "What's the last great book you read? What did you enjoy about it?",
    "Which movie or TV show do you think everyone should watch?",
    "Is there an artist or band that's significantly influenced your taste in music?",
    "What's your go-to recommendation for someone looking for a new podcast?",
    "Do you have a favorite museum or art exhibit you've visited?",
    "What's a show you've watched multiple times?",
    "What kind of content do you enjoy that might surprise people?",
    "Is there a performance (concert, play, etc.) that left a lasting impression on you?",
    "How has your taste in entertainment evolved over the years?",
    "What's something you enjoy that's considered underrated?"
  ],
  food: [
    "If you had to eat one cuisine for the rest of your life, what would it be?",
    "Do you have a signature dish that you love to cook?",
    "What's your favorite food memory?",
    "Is there an unusual food combination you enjoy?",
    "What's a food from your childhood that you still love?",
    "If someone visited your area, what local food would you recommend?",
    "What's the most memorable meal you've ever had?",
    "Is there a food you didn't like as a child but enjoy now?",
    "What's your approach to trying new foods?",
    "Do you have any food traditions or rituals?"
  ]
};

// Get random topics from different categories
export const getRandomTopics = (count: number = 8): string[] => {
  const allCategories = Object.keys(conversationStarters);
  const result: string[] = [];
  
  // Ensure at least one topic from each category if possible
  allCategories.forEach(category => {
    if (result.length < count) {
      const categoryTopics = conversationStarters[category as keyof typeof conversationStarters];
      const randomIndex = Math.floor(Math.random() * categoryTopics.length);
      result.push(categoryTopics[randomIndex]);
    }
  });
  
  // Fill the rest with random topics
  while (result.length < count) {
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    const categoryTopics = conversationStarters[randomCategory as keyof typeof conversationStarters];
    const randomTopic = categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
    
    // Avoid duplicates
    if (!result.includes(randomTopic)) {
      result.push(randomTopic);
    }
  }
  
  return result;
};

// Simulated response based on user input
export const generateResponse = (userMessage: string): string => {
  // Convert to lowercase for easier matching
  const message = userMessage.toLowerCase();
  
  // Simple keyword matching for demo purposes
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! How can I help make your conversations more engaging today?";
  }
  else if (message.includes('thank')) {
    return "You're welcome! Let me know if you need more conversation starters.";
  }
  else if (message.includes('help') || message.includes('how')) {
    return "I can suggest conversation topics to help keep your discussions flowing. Try asking for topics about work, hobbies, food, or just general conversation starters!";
  }
  else if (message.includes('work') || message.includes('job') || message.includes('career')) {
    const workTopics = conversationStarters.work;
    return workTopics[Math.floor(Math.random() * workTopics.length)];
  }
  else if (message.includes('hobby') || message.includes('interest') || message.includes('pastime')) {
    const hobbyTopics = conversationStarters.hobbies;
    return hobbyTopics[Math.floor(Math.random() * hobbyTopics.length)];
  }
  else if (message.includes('movie') || message.includes('book') || message.includes('music') || message.includes('show')) {
    const entertainmentTopics = conversationStarters.entertainment;
    return entertainmentTopics[Math.floor(Math.random() * entertainmentTopics.length)];
  }
  else if (message.includes('food') || message.includes('eat') || message.includes('restaurant') || message.includes('cuisine')) {
    const foodTopics = conversationStarters.food;
    return foodTopics[Math.floor(Math.random() * foodTopics.length)];
  }
  else {
    // Default responses
    const defaultResponses = [
      "That's interesting! Here's another topic to consider: " + conversationStarters.general[Math.floor(Math.random() * conversationStarters.general.length)],
      "Great point! You might also want to discuss: " + conversationStarters.general[Math.floor(Math.random() * conversationStarters.general.length)],
      "I see where you're coming from. Here's another conversation starter: " + conversationStarters.general[Math.floor(Math.random() * conversationStarters.general.length)],
      "That's a good conversation direction! You could also try: " + conversationStarters.general[Math.floor(Math.random() * conversationStarters.general.length)]
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
};
