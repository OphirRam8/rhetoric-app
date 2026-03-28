export const scenarios = [
  {
    id: 'salary',
    title: 'Salary Negotiation',
    icon: '💼',
    description: 'You\'re negotiating a salary increase with your manager.',
    situation: 'You\'ve been in your role for 18 months, consistently exceeding targets. Your manager has budget for a raise but is hesitant. They say: "I appreciate your work, but the company is being cautious with compensation right now."',
    steps: [
      {
        prompt: 'Your manager just pushed back on your raise request citing company caution. What\'s your first move?',
        options: [
          { text: 'Express frustration about being undervalued', feedback: 'This shifts to blame (past tense) and damages your ethos. You want to stay in the future tense.', correct: false },
          { text: 'Show empathy and signal disinterest: "I understand the constraints, and I want to find something that works for both of us."', feedback: 'Excellent! You\'re building eunoia (disinterested goodwill) while acknowledging their position. This is a concession that costs you nothing.', correct: true },
          { text: 'Immediately present competing offers', feedback: 'This is a threat (ad baculum) disguised as information. It can work but damages the relationship and trust.', correct: false },
          { text: 'Accept their position and ask to revisit later', feedback: 'You\'re giving up control of the argument. You should at least reframe before conceding.', correct: false },
        ],
      },
      {
        prompt: 'Good. Now you need to reframe the conversation. What commonplace can you invoke?',
        options: [
          { text: '"I deserve more money because I work hard."', feedback: 'This is about you, not about shared values. It\'s not a commonplace the audience holds.', correct: false },
          { text: '"We both want the best person fully committed to this role."', feedback: 'Perfect commonplace! It\'s a shared belief that naturally leads to your conclusion (invest in retaining talent).', correct: true },
          { text: '"Everyone else in my position makes more."', feedback: 'This is an inductive argument (examples), not a commonplace. It can support your case but isn\'t the starting point.', correct: false },
          { text: '"The market is competitive right now."', feedback: 'Close, but this is an external fact, not a shared value. A commonplace should be something you both already believe in.', correct: false },
        ],
      },
      {
        prompt: 'Now use stasis to redefine the terms. Your manager sees this as "a salary increase." How do you reframe?',
        options: [
          { text: '"This isn\'t about salary - it\'s about total investment in someone who can deliver specific value."', feedback: 'Perfect stasis move (Definition level)! You\'ve shifted from "cost" to "investment" - controlling the connotation changes the argument entirely.', correct: true },
          { text: '"This is about fairness and doing the right thing."', feedback: 'This shifts to demonstrative rhetoric (values/present tense). You want deliberative rhetoric focused on the future.', correct: false },
          { text: '"Let me show you the market data for this role."', feedback: 'Logos-heavy but doesn\'t redefine the terms. You\'re still arguing within their frame of "salary increase."', correct: false },
          { text: '"If you don\'t adjust my compensation, I might need to explore other options."', feedback: 'This is a threat (ad baculum). It\'s a rhetorical foul that shuts down productive argument.', correct: false },
        ],
      },
      {
        prompt: 'Finally, close with the future tense. What\'s your closing move?',
        options: [
          { text: '"Here\'s what I\'ve done in the past 18 months..." (list achievements)', feedback: 'Past tense! Forensic rhetoric. Good supporting evidence but not your closer.', correct: false },
          { text: '"Here\'s what I\'m going to deliver in the first 90 days at this new level, and here\'s what that means for the team."', feedback: 'Perfect deliberative close! Future tense, specific, and framed as value to THEM. This paints the vision of your mutual success.', correct: true },
          { text: '"I really need this for personal reasons."', feedback: 'This damages your disinterested goodwill. Now it looks like you have personal stakes, not shared ones.', correct: false },
          { text: '"What would it take for you to approve this?"', feedback: 'Not bad - it\'s future-oriented. But you\'re giving up control of the narrative. Better to paint the vision yourself.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'team-pivot',
    title: 'Convincing a Team to Pivot',
    icon: '🔄',
    description: 'Your team needs to change direction, but they\'re invested in the current approach.',
    situation: 'Your team has spent 3 months on a project. New data shows the current approach won\'t hit targets. The team lead says: "We\'ve put too much work into this to change now."',
    steps: [
      {
        prompt: 'The team lead just invoked the sunk cost fallacy. How do you respond?',
        options: [
          { text: '"That\'s a sunk cost fallacy and you know it."', feedback: 'Correct logically, but terrible rhetorically. You\'ve just humiliated a colleague (Foul #3). They\'ll dig in harder.', correct: false },
          { text: '"I\'ve been working on this with you and I know how much effort has gone in. The current approach was the right call when we started."', feedback: 'Excellent! You\'re building ethos through shared experience and conceding their point. This is the "concede to conquer" move.', correct: true },
          { text: '"The data is clear - we need to pivot now."', feedback: 'Pure logos with no ethos foundation. They won\'t hear your logic until they trust you\'re on their side.', correct: false },
          { text: '"Let\'s take a vote on whether to continue."', feedback: 'This forces a public choice that could backfire. You haven\'t persuaded anyone yet.', correct: false },
        ],
      },
      {
        prompt: 'You\'ve acknowledged their effort. Now build your enthymeme. The team values being "data-driven." What do you say?',
        options: [
          { text: '"The data shows we should pivot. Here are the numbers."', feedback: 'You\'re spelling out the full argument. An enthymeme would let them reach the conclusion themselves.', correct: false },
          { text: '"We\'ve always said we\'d follow the data wherever it leads." Then present the data.', feedback: 'Perfect enthymeme! The unstated conclusion (we should pivot) follows naturally from their own stated value. They fill in the blank.', correct: true },
          { text: '"Other companies in our space have already pivoted."', feedback: 'Inductive argument by example. Decent supporting evidence but not as powerful as using their own stated values.', correct: false },
          { text: '"I think the old approach was flawed from the start."', feedback: 'This is past tense (forensic) and attacks the team\'s judgment. It will trigger defensiveness.', correct: false },
        ],
      },
      {
        prompt: 'The team is wavering. How do you close?',
        options: [
          { text: 'Present a detailed 30-page analysis of why the pivot is necessary.', feedback: 'Information overload. At this point they need pathos (emotion/vision), not more logos.', correct: false },
          { text: 'Paint the vision: "Imagine where we could be in 6 months if we redirect this energy. Here\'s what the pivot could achieve..."', feedback: 'Perfect pathos close! Future tense, vivid imagery, and it channels their existing energy toward the new direction.', correct: true },
          { text: 'Call for an immediate decision before anyone changes their mind.', feedback: 'This ignores kairos. Rushing a decision can create resentment and second-guessing.', correct: false },
          { text: 'Offer to take full responsibility if the pivot fails.', feedback: 'This shows goodwill but also signals you\'re not confident. Better to paint success than prepare for failure.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'conflict',
    title: 'Resolving a Colleague Conflict',
    icon: '🤝',
    description: 'A colleague is upset about a decision you made that affected their work.',
    situation: 'A colleague confronts you: "You went ahead and changed the API without telling me. My whole sprint is now wasted. This is really disrespectful."',
    steps: [
      {
        prompt: 'Your colleague is angry and using blame language (past tense, forensic). What\'s your opening move?',
        options: [
          { text: '"I sent an email about it last week, you should have read it."', feedback: 'This is counter-blame - still forensic rhetoric. You\'re now in a fight, not an argument.', correct: false },
          { text: '"I know this has been frustrating. It\'s frustrated me too that we weren\'t better coordinated."', feedback: 'The Backfire technique! You\'re expressing their emotion first, stealing the thunder, AND using "we" language to signal shared responsibility.', correct: true },
          { text: '"Let\'s not point fingers. What\'s done is done."', feedback: 'Dismissive. You\'re invalidating their emotion without addressing it. They\'ll feel unheard.', correct: false },
          { text: '"I\'m sorry you feel that way."', feedback: 'The classic non-apology. It sounds like you\'re blaming them for their feelings, not taking responsibility.', correct: false },
        ],
      },
      {
        prompt: 'Good - you\'ve de-escalated. Now shift the tense. What do you say?',
        options: [
          { text: '"Let me explain why I made that change..." (justify your decision)', feedback: 'Still past tense! You\'re defending, which keeps the argument in forensic mode.', correct: false },
          { text: '"I don\'t want to argue about what happened. I want to talk about how we work together from here."', feedback: 'Perfect tense shift! You\'re explicitly moving from past (blame) to future (choice). This is the core deliberative move.', correct: true },
          { text: '"This kind of thing happens in every team."', feedback: 'Demonstrative rhetoric (present tense, values). It minimizes their concern and doesn\'t move toward resolution.', correct: false },
          { text: '"Can we just agree to disagree?"', feedback: 'This avoids the argument entirely. You need to reach agreement, not avoidance.', correct: false },
        ],
      },
      {
        prompt: 'You\'ve shifted to the future. Now demonstrate disinterested goodwill and propose a solution.',
        options: [
          { text: '"Here\'s what I think we should do going forward..." (present your plan)', feedback: 'Good intent but you\'re not demonstrating disinterest. You\'re dictating rather than collaborating.', correct: false },
          { text: '"I\'m not trying to win this. I want to find something that works for both of us. What if we set up a quick sync before any API changes?"', feedback: 'Perfect! You\'ve signaled disinterested goodwill, used "both of us" (code grooming), and proposed a specific future-tense solution.', correct: true },
          { text: '"What would make you feel better about this?"', feedback: 'Puts all the burden on them. Better to propose something that shows you\'ve thought about their needs.', correct: false },
          { text: '"I\'ll make sure to CC you on everything from now on."', feedback: 'Overpromising and reactive. It doesn\'t address the underlying coordination issue.', correct: false },
        ],
      },
    ],
  },
];
