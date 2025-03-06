// src/data/premiumFeatures.js
export const isPremiumUser = () => {
    return localStorage.getItem('pilatesPulse_premium') === 'true';
  };
  
  export const setPremiumStatus = (status) => {
    localStorage.setItem('pilatesPulse_premium', status);
  };
  
  // Premium workout programs - structured multi-week series
  export const workoutPrograms = [
    {
      id: 'core-strength',
      name: 'Core Strength Foundation',
      description: 'A 4-week program to build core strength gradually',
      premium: true,
      level: 'beginner',
      duration: '4 weeks',
      workoutsPerWeek: 3,
      image: '💪',
      weeks: [
        {
          name: 'Week 1: Foundations',
          description: 'Learn fundamental core activation and basic exercises',
          workouts: [
            {
              name: 'Day 1: Core Basics',
              duration: 20,
              focus: ['core'],
              exercises: [1, 3, 5, 7, 29]
            },
            {
              name: 'Day 2: Gentle Progression',
              duration: 25,
              focus: ['core', 'back'],
              exercises: [1, 2, 3, 7, 8]
            },
            {
              name: 'Day 3: Standing Core',
              duration: 20,
              focus: ['core', 'balance'],
              exercises: [1, 4, 5, 29, 30]
            }
          ]
        },
        {
          name: 'Week 2: Building Endurance',
          description: 'Increase duration and add slightly more challenging exercises',
          workouts: [
            {
              name: 'Day 1: Core Stability',
              duration: 25,
              focus: ['core', 'balance'],
              exercises: [1, 2, 4, 5, 28, 29]
            },
            {
              name: 'Day 2: Rotational Core',
              duration: 25,
              focus: ['core', 'flexibility'],
              exercises: [1, 4, 8, 28, 29]
            },
            {
              name: 'Day 3: Core Endurance',
              duration: 30,
              focus: ['core', 'arms'],
              exercises: [1, 2, 5, 6, 28, 30]
            }
          ]
        },
        {
          name: 'Week 3: Adding Challenge',
          description: 'Introduce more challenging variations and increase hold times',
          workouts: [
            {
              name: 'Day 1: Dynamic Core',
              duration: 30,
              focus: ['core', 'legs'],
              exercises: [1, 6, 11, 28, 30]
            },
            {
              name: 'Day 2: Oblique Focus',
              duration: 30,
              focus: ['core', 'back'],
              exercises: [1, 8, 11, 28, 29, 30]
            },
            {
              name: 'Day 3: Core Integration',
              duration: 35,
              focus: ['core', 'fullbody'],
              exercises: [1, 4, 6, 11, 28, 30]
            }
          ]
        },
        {
          name: 'Week 4: Advanced Integration',
          description: 'Challenge yourself with the most difficult core exercises',
          workouts: [
            {
              name: 'Day 1: Power Core',
              duration: 35,
              focus: ['core', 'arms'],
              exercises: [1, 6, 11, 28, 30]
            },
            {
              name: 'Day 2: Flow Core',
              duration: 40,
              focus: ['core', 'flexibility'],
              exercises: [1, 4, 6, 11, 28, 30]
            },
            {
              name: 'Day 3: Complete Core Challenge',
              duration: 45,
              focus: ['core', 'fullbody'],
              exercises: [1, 6, 11, 28, 29, 30]
            }
          ]
        }
      ]
    },
    {
      id: 'flexibility-mobility',
      name: 'Flexibility & Mobility Journey',
      description: 'Improve overall flexibility and joint mobility in 4 weeks',
      premium: true,
      level: 'all',
      duration: '4 weeks',
      workoutsPerWeek: 3,
      image: '🧘‍♀️',
      weeks: [
        {
          name: 'Week 1: Basic Mobility',
          description: 'Begin opening tight areas with gentle mobility work',
          workouts: [
            {
              name: 'Day 1: Spine Mobility',
              duration: 25,
              focus: ['back', 'flexibility'],
              exercises: [2, 3, 7, 8, 26]
            },
            {
              name: 'Day 2: Hip Opening',
              duration: 25,
              focus: ['legs', 'flexibility'],
              exercises: [3, 7, 10, 21, 28]
            },
            {
              name: 'Day 3: Full Body Flow',
              duration: 30,
              focus: ['fullbody', 'flexibility'],
              exercises: [2, 3, 7, 8, 10, 28]
            }
          ]
        },
        {
          name: 'Week 2: Deepening Flexibility',
          description: 'Progress to deeper stretches and increased range of motion',
          workouts: [
            // Similar structure to above
          ]
        },
        {
          name: 'Week 3: Dynamic Flexibility',
          description: 'Add movement to your flexibility work for functional improvement',
          workouts: [
            // Similar structure to above
          ]
        },
        {
          name: 'Week 4: Integration',
          description: 'Combine all elements into flowing sequences for total body mobility',
          workouts: [
            // Similar structure to above
          ]
        }
      ]
    },
    {
      id: 'posture-alignment',
      name: 'Posture Perfect',
      description: 'Improve your alignment and reduce pain from poor posture',
      premium: true,
      level: 'beginner',
      duration: '4 weeks',
      workoutsPerWeek: 3,
      image: '🏆',
      weeks: [
        // Similar structure to above
      ]
    }
  ];
  
  // Premium exercises (extends the base exercise database)
  export const premiumExercises = [
    {
      id: 101,
      name: 'Advanced Teaser Variations',
      description: 'A series of progressive teaser variations to challenge your core strength.',
      equipment: ['none'],
      duration: 4,
      targetAreas: ['core', 'flexibility'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Keep arms alongside body if wrists are sensitive',
        back: 'Avoid if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Keep arms lower if shoulders are tight',
        pregnancy: 'Not recommended',
        balance: 'Practice basic teaser first'
      },
      premium: true,
      image: '🔥'
    },
    {
      id: 102,
      name: 'Complex Spine Twist',
      description: 'An advanced twist incorporating arm patterns and leg movements for full body integration.',
      equipment: ['none'],
      duration: 3,
      targetAreas: ['core', 'back', 'flexibility'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Modify arm positions if needed',
        back: 'Reduce rotation range if back is sensitive',
        knee: 'Keep knees slightly bent if hamstrings are tight',
        shoulder: 'Reduce arm movement range',
        pregnancy: 'Not recommended',
        balance: 'Perform seated against wall initially'
      },
      premium: true,
      image: '🌀'
    },
    {
      id: 103,
      name: 'Flow Sequence A',
      description: 'A flowing sequence of movements connecting breath to movement for increased mind-body awareness.',
      equipment: ['none'],
      duration: 5,
      targetAreas: ['fullbody', 'flexibility', 'core'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Modify hand positions as needed',
        back: 'Move more slowly and with smaller range',
        knee: 'Avoid deep knee flexion if sensitive',
        shoulder: 'Reduce arm movement range',
        pregnancy: 'Use modified positions in second trimester',
        balance: 'Hold onto stable support if needed'
      },
      premium: true,
      image: '🌊'
    },
    // Add several more premium exercises here
  ];
  
  // Premium-exclusive workout templates
  export const premiumTemplates = [
    {
      id: 'morning-energizer',
      name: 'Morning Energizer',
      description: 'A quick 15-minute routine to start your day with energy and focus',
      duration: 15,
      targetAreas: ['core', 'fullbody'],
      difficulty: 'beginner',
      premium: true,
      exercises: [1, 3, 7, 29, 30]
    },
    {
      id: 'stress-relief',
      name: 'Stress Relief Flow',
      description: 'A gentle 20-minute routine focused on breathing and releasing tension',
      duration: 20,
      targetAreas: ['flexibility', 'back'],
      difficulty: 'beginner',
      premium: true,
      exercises: [2, 3, 7, 8, 26]
    },
    {
      id: 'core-blaster',
      name: 'Core Blaster',
      description: 'An intense 25-minute core-focused workout for advanced practitioners',
      duration: 25,
      targetAreas: ['core'],
      difficulty: 'advanced',
      premium: true,
      exercises: [1, 6, 11, 28, 30, 101]
    }
  ];
  
  // Mock purchase function (would connect to payment processor in production)
  export const purchasePremium = () => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        setPremiumStatus(true);
        resolve({ success: true });
      }, 1500);
    });
  };