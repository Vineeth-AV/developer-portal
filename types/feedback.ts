export type FeedbackData = {
  option: string; // The title of the selected option
  path: string; // The path of the page the feedback was submitted from
  title: string; // The title of the page the feedback was submitted from
  additionalFeedback?: string; // Additional feedback from the user
  email?: string; // The user's email address
};

export type FeedbackOption = {
  title: string;
  description: string;
  id: number;
};