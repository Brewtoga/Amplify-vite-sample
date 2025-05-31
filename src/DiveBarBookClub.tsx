import React, { useState, useEffect } from 'react';
import './DiveBarBookClub.css';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface DiveBarBookClubProps {
  onBackToMenu?: () => void;
}

const DiveBarBookClub: React.FC<DiveBarBookClubProps> = ({ onBackToMenu }) => {
  const ironFlameQuestions: Question[] = [
    // Set 1 (1-5)
    {
      question: "What is the name of the war college Violet attends?",
      options: ["Basgiath War College", "Navarre Academy", "Dragon Riders Institute", "War Command School"],
      correct: 0
    },
    {
      question: "How many dragons does Violet bond with?",
      options: ["One", "Two", "Three", "None - she fails to bond"],
      correct: 1
    },
    {
      question: "Who is Violet's main love interest?",
      options: ["Liam", "Xaden", "Dain", "Ridoc"],
      correct: 1
    },
    {
      question: "What is Violet's signet (magical ability)?",
      options: ["Lightning wielding", "Mind reading", "Healing", "Shield creation"],
      correct: 0
    },
    {
      question: "What are the names of Violet's dragons?",
      options: ["Tairn and Sgaeyl", "Andarna and Tairn", "Cuir and Andarna", "Tairn and Cuir"],
      correct: 1
    },
    // Set 2 (6-10)
    {
      question: "What distinguishing feature does Violet have in her hair?",
      options: ["Natural silver streaks from birth", "Lightning-caused white patches", "Magically blue tips", "Nothing unusual"],
      correct: 0
    },
    {
      question: "What is the Apostasy?",
      options: ["A dragon type", "A rebellion", "A weapon", "A location"],
      correct: 1
    },
    {
      question: "Who is Violet's mother?",
      options: ["General Sorrengail", "Colonel Aetos", "Major Varrish", "General Melgren"],
      correct: 0
    },
    {
      question: "What is Ward Stone used for?",
      options: ["Dragon breeding", "Communication", "Protection from venin", "Weather control"],
      correct: 2
    },
    {
      question: "What are venin?",
      options: ["Dragon hunters", "Dark wielders who drain magic", "Elite riders", "Ancient warriors"],
      correct: 1
    },
    // Set 3 (11-15)
    {
      question: "What is Violet's biggest physical limitation?",
      options: ["Poor eyesight", "Joint condition/fragility", "Hearing loss", "Chronic fatigue"],
      correct: 1
    },
    {
      question: "Where do Violet and Xaden go to find answers about the venin?",
      options: ["Aretia", "Tyrrendor", "Draithmoor", "All of the above"],
      correct: 3
    },
    {
      question: "What is special about Andarna?",
      options: ["She's the last of her kind", "She can manipulate time", "She's golden", "She can't breathe fire"],
      correct: 1
    },
    {
      question: "Who betrays Violet by reading her memories?",
      options: ["Xaden", "Dain", "Liam", "Ridoc"],
      correct: 1
    },
    {
      question: "What is the truth about the attacks on Navarre?",
      options: ["They're from Poromiel", "They're venin attacks", "They're training exercises", "They're from within"],
      correct: 1
    },
    // Set 4 (16-20)
    {
      question: "What happens to Liam?",
      options: ["He transfers schools", "He becomes a commander", "He dies protecting Violet", "He loses his dragon"],
      correct: 2
    },
    {
      question: "What is Xaden's signet?",
      options: ["Shadow wielding", "Metal manipulation", "Ice creation", "Mind control"],
      correct: 0
    },
    {
      question: "Why was Violet's father really killed?",
      options: ["Battle accident", "He knew about the venin threat", "Political rivalry", "Dragon attack"],
      correct: 1
    },
    {
      question: "What is the relationship between dragons and their riders' death?",
      options: ["Dragons live on", "Dragons die too", "Dragons choose new riders", "Dragons become wild"],
      correct: 1
    },
    {
      question: "What major revelation does Violet learn about the war?",
      options: ["It's been going on for centuries", "The real enemy is venin, not other kingdoms", "Dragons are dying out", "Magic is fading"],
      correct: 1
    }
  ];

  const onyxStormQuestions: Question[] = [
    {
      question: "What is the main setting for Onyx Storm?",
      options: ["Basgiath War College", "The Continent", "Aretia", "Unknown - book not released yet"],
      correct: 3
    },
    {
      question: "When was Onyx Storm originally scheduled for release?",
      options: ["2024", "2025", "2026", "2027"],
      correct: 1
    },
    {
      question: "Onyx Storm is which book in the Empyrean series?",
      options: ["Second", "Third", "Fourth", "Fifth"],
      correct: 1
    },
    {
      question: "Who is the author of the Empyrean series?",
      options: ["Sarah J. Maas", "Jennifer L. Armentrout", "Rebecca Yarros", "Stephanie Meyer"],
      correct: 2
    },
    {
      question: "What can we expect from Onyx Storm based on Iron Flame's ending?",
      options: ["Wedding planning", "More venin battles", "Dragon training", "All speculation until release"],
      correct: 3
    }
  ];

  const [currentBook, setCurrentBook] = useState<'ironflame' | 'onyxstorm'>('ironflame');
  const [questions, setQuestions] = useState<Question[]>(ironFlameQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [showFireworks, setShowFireworks] = useState<boolean>(false);

  // Timer state for next book release countdown
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOverdue, setIsOverdue] = useState(false);

  // Calculate time remaining until next book release (example: July 1, 2025)
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const releaseDate = new Date('2025-07-01T00:00:00');

      const difference = releaseDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsOverdue(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
      setIsOverdue(false);
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectAnswer = (index: number) => {
    if (questionAnswered) return;
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }

    setQuestionAnswered(true);

    setTimeout(() => {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      // Check if we completed a set of 5
      if (newIndex % 5 === 0) {
        const setCorrectAnswers = correctAnswersCount + (isCorrect ? 1 : 0);
        const currentSetCorrect = setCorrectAnswers - (currentSet - 1) * 5;
        
        if (currentSetCorrect >= 3) { // Need at least 3/5 correct
          if (newIndex >= questions.length) {
            setShowCelebration(true);
            setShowFireworks(true);
          } else {
            setCurrentSet(prev => prev + 1);
          }
        } else {
          alert(`You need at least 3 correct answers to proceed. You got ${currentSetCorrect}/5. Starting this set over.`);
          setCurrentQuestionIndex(newIndex - 5);
          setCorrectAnswersCount(prev => prev - currentSetCorrect);
        }
      }
      
      setSelectedAnswer(null);
      setQuestionAnswered(false);
    }, 1500);
  };

  const nextBook = () => {
    if (currentBook === 'ironflame') {
      setCurrentBook('onyxstorm');
      setQuestions(onyxStormQuestions);
      setCurrentQuestionIndex(0);
      setCurrentSet(1);
      setCorrectAnswersCount(0);
      setShowCelebration(false);
      setShowFireworks(false);
    } else {
      alert('Congratulations! You\'ve completed all available books. Check back for more releases!');
    }
  };

  const renderFireworks = () => {
    if (!showFireworks) return null;
    
    const fireworks = [];
    for (let i = 0; i < 20; i++) {
      fireworks.push(
        <div
          key={i}
          className="firework"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ['#d4af37', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 5)],
            animationDelay: `${i * 100}ms`
          }}
        />
      );
    }
    return <div className="fireworks">{fireworks}</div>;
  };

  const progress = (currentQuestionIndex / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="book-club-container">
      {onBackToMenu && (
        <div className="back-to-menu">
          <button className="back-to-menu-btn" onClick={onBackToMenu}>
            ← Back to Judy's Pub Menu
          </button>
        </div>
      )}
      
      <div className="sidebar">
        <h3>Navigation</h3>
        <ul>
          <li>Current Quiz</li>
          <li>Leaderboard <span className="construction">(Under Construction)</span></li>
          <li>Discussion Board <span className="construction">(Under Construction)</span></li>
          <li>Notes Page <span className="construction">(Under Construction)</span></li>
        </ul>
        
        <h3>Swag Shop</h3>
        <ul>
          <li>T-Shirts <span className="construction">(Under Construction)</span></li>
          <li>Mugs <span className="construction">(Under Construction)</span></li>
          <li>Bookmarks <span className="construction">(Under Construction)</span></li>
          <li>Tote Bags <span className="construction">(Under Construction)</span></li>
        </ul>

        <h3>Past Books</h3>
        <ul>
          <li>Archive <span className="construction">(Under Construction)</span></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="logo">🍸 Dive Bar Book Club 📚</div>
          <div className="tagline">"Where Literature Meets Last Call"</div>
          <button className="refresh-btn" onClick={() => {
            if (window.confirm('Are you sure you want to restart the quiz? This will reset all progress.')) {
              window.location.reload();
            }
          }}>
            🔄 Restart Quiz
          </button>
        </div>

        <div className="current-book">
          <div className="book-title">
            Current Book: {currentBook === 'ironflame' ? 'Iron Flame' : 'Onyx Storm'}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length} (Set {currentSet} of {Math.ceil(questions.length / 5)})
          </div>
          {currentBook === 'onyxstorm' && (
            <div className="countdown-item">
              <span className="stat-label">Estimated Release:</span>
              <span className={`countdown-value ${isOverdue ? 'overdue' : ''}`}>
                {isOverdue ? (
                  'Available Now!'
                ) : (
                  <>
                    {timeRemaining.days > 0 && <span>{timeRemaining.days}d </span>}
                    <span>{timeRemaining.hours.toString().padStart(2, '0')}:</span>
                    <span>{timeRemaining.minutes.toString().padStart(2, '0')}:</span>
                    <span>{timeRemaining.seconds.toString().padStart(2, '0')}</span>
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {!showCelebration ? (
          <div className="quiz-container">
            <div className="question">{currentQuestion.question}</div>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    questionAnswered && index === currentQuestion.correct ? 'correct' : ''
                  } ${
                    questionAnswered && selectedAnswer === index && index !== currentQuestion.correct ? 'incorrect' : ''
                  }`}
                  onClick={() => selectAnswer(index)}
                >
                  {option}
                </div>
              ))}
            </div>
            <button 
              className="next-btn" 
              onClick={nextQuestion}
              disabled={selectedAnswer === null || questionAnswered}
            >
              {questionAnswered ? 'Loading...' : 'Next Question'}
            </button>
          </div>
        ) : (
          <div className="celebration">
            <h2>🎉 CONGRATULATIONS! 🎉</h2>
            <p>You've mastered {currentBook === 'ironflame' ? 'Iron Flame' : 'Onyx Storm'}! Time to dive into the next adventure.</p>
            <button className="next-book-btn" onClick={nextBook}>
              {currentBook === 'ironflame' ? 'Ask for Next Book: Onyx Storm' : 'All Books Completed!'}
            </button>
          </div>
        )}
      </div>

      {renderFireworks()}
    </div>
  );
};

export default DiveBarBookClub;