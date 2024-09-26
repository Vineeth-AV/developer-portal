
'use client';

import clsx from 'clsx';
import { usePath } from 'context/state';
import { useEffect, useState } from 'react';
import { FeedbackData, FeedbackOption } from 'types';

type Props = {
  title: string;
};



// Send feedback to the server
const sendFeedback = async (feedback: FeedbackData) => {
  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedback)
    });
    return response.status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const FeedbackForm = ({ title }: Props) => {

  const path = usePath();
  const pageTitle = window.document.title;

  const [selected, setSelected] = useState<number>();
  const [email, setEmail] = useState<string>();
  const [comment, setComment] = useState<string>();
  const [opacity, setOpacity] = useState('opacity-0');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpacity('opacity-100');
    }, 100);
  }, []);

  return feedbackSubmitted ? (
    <h3 className="mb-10 mt-5">Thanks for the feedback!</h3>
  ) : (
    <div
      className={`mb-9 mt-4 flex flex-col gap-0 ${opacity} transition duration-700 ease-in-out`}
    >
      <h3 className="my-0">{title}</h3>
      <form className="w-full p-3 pl-0 text-sm text-gray-700 dark:text-gray-200">
        <ul className="list-none pl-0">

          < div className="ml-2 mt-2 text-xs" >
            <label
              htmlFor="feedback-comment"
              className="font-medium text-gray-900 dark:text-gray-300"
            >
              Feedback
            </label>
            <textarea
              id="feedback-comment"
              placeholder=""
              className={clsx(
                'mx-2 mt-2 h-14 w-full resize-none rounded-md border border-gray-300 p-3 text-xs shadow-sm',
                'dark:border-darkBorder dark:bg-black dark:focus:border-primary dark:focus:ring-primary',
                'focus:border-primary focus:ring-primary'
              )}
              onChange={(e) => {
                setComment(e.currentTarget.value);
              }}
            />
          </div>
           
        </ul >
        <button
          className={clsx(
            'mt-4 flex h-[28px] w-[60px] items-center justify-center rounded border-lightBorder bg-primary py-2',
            'text-center text-sm font-semibold text-white shadow-sm',
            'disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:opacity-50'
          )}
          type="submit"
          
          onClick={(e) => {
            e.preventDefault();
            setFeedbackSubmitted(true);
            sendFeedback({
              additionalFeedback: comment,
              email,

              option: title,
              path,

              title: removeTrailingDocs(pageTitle)
            });
          }}
        >
          Submit
        </button>
      </form >
    </div >
  );
};

function removeTrailingDocs(text: string) {
  return text.replace(/\s*\|\s*$/, '');
}
