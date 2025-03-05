 // Exercise database - each exercise contains name, description, equipment needed, duration, target areas
 const exerciseDatabase = [
    {
      id: 1,
      name: 'The Hundred',
      description: 'Lie on your back with legs in tabletop position. Pump arms up and down while breathing in for 5 and out for 5.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'Keep arms alongside body if wrists are sensitive',
        back: 'Keep head down and legs higher if you have back issues',
        knee: 'No specific modification needed',
        shoulder: 'Smaller range of motion for arm pumps',
        pregnancy: 'After first trimester, perform with legs in tabletop position',
        balance: 'No specific modification needed'
      },
      image: '🧘‍♀️'
    },
    {
      id: 2,
      name: 'Roll Up',
      description: 'Start lying on your back, arms extended overhead. Roll up to seated position one vertebra at a time.',
      equipment: ['none'],
      duration: 3,
      targetAreas: ['core', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Bend knees or skip this exercise if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Keep arms forward instead of overhead if shoulders are tight',
        pregnancy: 'Perform with knees bent and use hands for support',
        balance: 'No specific modification needed'
      },
      image: '🧍‍♀️'
    },
    {
      id: 3,
      name: 'Single Leg Circles',
      description: 'Lie on your back, one leg extended to ceiling. Circle leg in controlled motion in both directions.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'legs', 'flexibility'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Smaller circles and keep opposite knee bent',
        knee: 'Avoid if you have acute knee pain',
        shoulder: 'No specific modification needed',
        pregnancy: 'Keep circles smaller and both knees bent if needed',
        balance: 'No specific modification needed'
      },
      image: '🦵'
    },
    {
      id: 4,
      name: 'Rolling Like a Ball',
      description: 'Balance on your sit bones, knees to chest, and roll back and forth maintaining a C-curve shape.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Skip if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Keep hands on sides of knees rather than underneath',
        pregnancy: 'Not recommended after first trimester',
        balance: 'Practice balancing before rolling'
      },
      image: '⚪'
    },
    {
      id: 5,
      name: 'Single Leg Stretch',
      description: 'Lie on your back in crunch position, alternate extending one leg while hugging the other to your chest.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'legs'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'Rest head in hands if neck/shoulder tension occurs',
        back: 'Keep head down and legs higher',
        knee: 'Smaller range of motion if knees are sensitive',
        shoulder: 'Keep head down if neck/shoulder tension occurs',
        pregnancy: 'Keep both knees bent and head down after first trimester',
        balance: 'No specific modification needed'
      },
      image: '🧎‍♀️'
    },
    {
      id: 6,
      name: 'Double Leg Stretch',
      description: 'Start in crunch position, arms hugging knees. Extend arms and legs simultaneously, then return to start.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'arms', 'legs'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Keep arms lower if wrists are sensitive',
        back: 'Keep legs higher and range of motion smaller',
        knee: 'No specific modification needed',
        shoulder: 'Keep arms lower and closer to body',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '✨'
    },
    {
      id: 7,
      name: 'Spine Stretch Forward',
      description: 'Sit tall with legs extended, reach forward keeping your back straight, then roll down one vertebra at a time.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['back', 'flexibility'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Sit on cushion and bend knees slightly',
        knee: 'Bend knees if hamstrings are tight',
        shoulder: 'Keep arms lower if shoulders are tight',
        pregnancy: 'Sit with legs apart to make room for belly',
        balance: 'Sit against wall for support if needed'
      },
      image: '⤵️'
    },
    {
      id: 8,
      name: 'Saw',
      description: 'Sit with legs wide apart, twist upper body and reach opposite hand to opposite foot.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'back', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Twist less deeply if you have back issues',
        knee: 'Bend knees slightly if hamstrings are tight',
        shoulder: 'Smaller range of motion for arms',
        pregnancy: 'Sit elevated and twist less deeply',
        balance: 'Sit against wall for support if needed'
      },
      image: '🪚'
    },
    {
      id: 9,
      name: 'Swan Dive',
      description: 'Lie on stomach, lift chest and legs off mat. Rock forward and back in controlled motion.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['back', 'glutes'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Skip if you have acute back pain or try Swan Prep instead',
        knee: 'No specific modification needed',
        shoulder: 'Keep arms closer to body',
        pregnancy: 'Not recommended',
        balance: 'No specific modification needed'
      },
      image: '🦢'
    },
    {
      id: 10,
      name: 'Side Kicks',
      description: 'Lie on your side, support head with hand. Kick top leg forward and back in controlled motions.',
      equipment: ['none'],
      duration: 3,
      targetAreas: ['legs', 'glutes', 'core'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Support head on arm rather than hand',
        back: 'Keep range of motion smaller',
        knee: 'Smaller kicks if knees are sensitive',
        shoulder: 'Rest head on arm or pillow if shoulders are tight',
        pregnancy: 'Place pillow under belly if needed',
        balance: 'Lean back against wall for support'
      },
      image: '🦵'
    },
    {
      id: 11,
      name: 'Teaser',
      description: 'Lie on back, roll up to V-position with legs extended at 45 degrees. Hold, then roll back down.',
      equipment: ['none'],
      duration: 3,
      targetAreas: ['core', 'legs'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Skip if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Keep arms alongside body instead of overhead',
        pregnancy: 'Not recommended',
        balance: 'Try one leg at a time version first'
      },
      image: '🔺'
    },
    {
      id: 12,
      name: 'Seal',
      description: 'Balance on your tailbone, clasping ankles. Roll back and forth, clapping feet 3 times in each position.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Skip if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'No specific modification needed',
        pregnancy: 'Not recommended',
        balance: 'Practice balancing before rolling'
      },
      image: '🦭'
    },
    {
      id: 13,
      name: 'Reformer Footwork',
      description: 'Lie on reformer with feet against footbar. Press legs out and in with different foot positions.',
      equipment: ['reformer'],
      duration: 4,
      targetAreas: ['legs', 'core'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Use higher spring tension for support',
        knee: 'Avoid full extension if knees are sensitive',
        shoulder: 'Use neck pillow if needed',
        pregnancy: 'Adjust footbar position for comfort',
        balance: 'No specific modification needed'
      },
      image: '🦿'
    },
    {
      id: 14,
      name: 'Reformer Hundred',
      description: 'Similar to mat Hundred but using the reformer springs for added resistance.',
      equipment: ['reformer'],
      duration: 3,
      targetAreas: ['core', 'arms'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Use lighter spring tension for arms',
        back: 'Keep head down and legs higher',
        knee: 'No specific modification needed',
        shoulder: 'Use lighter spring tension or smaller arm movements',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '💯'
    },
    {
      id: 15,
      name: 'Short Box Series',
      description: 'Sit on box facing front of reformer, perform various spinal movements with feet secured.',
      equipment: ['reformer'],
      duration: 5,
      targetAreas: ['core', 'back', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Avoid deep flexion if you have back issues',
        knee: 'No specific modification needed',
        shoulder: 'Keep arms closer to body for twists',
        pregnancy: 'Use wider strap positioning and avoid deep flexion',
        balance: 'Hold sides of box for additional support'
      },
      image: '📦'
    },
    {
      id: 16,
      name: 'Long Stretch',
      description: 'In plank position with feet on footbar, press carriage out and in using core control.',
      equipment: ['reformer'],
      duration: 3,
      targetAreas: ['core', 'arms', 'fullbody'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Place hands on bar instead of reformer if wrists are sensitive',
        back: 'Skip if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Use more spring tension for support',
        pregnancy: 'Not recommended',
        balance: 'Use higher spring tension for more stability'
      },
      image: '📏'
    },
    {
      id: 17,
      name: 'Ball Bridge',
      description: 'Lie on back with feet on exercise ball. Lift hips and lower in controlled motion.',
      equipment: ['ball'],
      duration: 3,
      targetAreas: ['core', 'glutes', 'back'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Smaller range of motion or use wall for ball stability',
        knee: 'Place ball closer to body if knees are sensitive',
        shoulder: 'No specific modification needed',
        pregnancy: 'Use caution or skip after second trimester',
        balance: 'Place ball against wall for stability'
      },
      image: '⚽'
    },
    {
      id: 18,
      name: 'Ball Roll Out',
      description: 'Kneel behind ball with hands on ball. Roll ball forward and back maintaining plank position.',
      equipment: ['ball'],
      duration: 3,
      targetAreas: ['core', 'arms', 'back'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Place forearms on ball instead of hands',
        back: 'Smaller range of motion',
        knee: 'Use a soft pad under knees',
        shoulder: 'Smaller range of motion',
        pregnancy: 'Not recommended after first trimester',
        balance: 'Start with ball against wall'
      },
      image: '🔄'
    },
    {
      id: 19,
      name: 'Ball Pike',
      description: 'Start in plank position with feet on ball. Pike hips up bringing ball toward hands.',
      equipment: ['ball'],
      duration: 3,
      targetAreas: ['core', 'arms', 'flexibility'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Use push-up handles if wrists are sensitive',
        back: 'Smaller range of motion or skip',
        knee: 'No specific modification needed',
        shoulder: 'Smaller range of motion',
        pregnancy: 'Not recommended',
        balance: 'Practice stability first before adding pike movement'
      },
      image: '⛰️'
    },
    {
      id: 20,
      name: 'Band Arm Work',
      description: 'Hold resistance band with both hands, perform various arm movements for resistance training.',
      equipment: ['band'],
      duration: 4,
      targetAreas: ['arms', 'back'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'Use lighter resistance band',
        back: 'Avoid excessive twisting',
        knee: 'No specific modification needed',
        shoulder: 'Smaller range of motion and lighter band',
        pregnancy: 'Stand instead of seated if more comfortable',
        balance: 'Sit or stand near wall for support'
      },
      image: '💪'
    },
    {
      id: 21,
      name: 'Band Leg Press',
      description: 'Lie on back, loop band around foot and press leg to ceiling against resistance.',
      equipment: ['band'],
      duration: 3,
      targetAreas: ['legs', 'glutes'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Keep opposite knee bent and foot on floor',
        knee: 'Use lighter resistance or avoid full extension',
        shoulder: 'No specific modification needed',
        pregnancy: 'Adjust leg position for comfort',
        balance: 'No specific modification needed'
      },
      image: '🦿'
    },
    {
      id: 22,
      name: 'Ring Pushups',
      description: 'Place ring between palms in push-up position, squeeze ring while performing push-ups.',
      equipment: ['ring'],
      duration: 2,
      targetAreas: ['arms', 'core'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Skip if wrists are very sensitive',
        back: 'Perform from knees instead of full plank',
        knee: 'Perform from knees instead of full plank',
        shoulder: 'Lower range of motion or skip if shoulders are painful',
        pregnancy: 'Not recommended after second trimester',
        balance: 'Perform against wall at an incline'
      },
      image: '⭕'
    },
    {
      id: 23,
      name: 'Inner Thigh Squeeze',
      description: 'Place ring between knees in bridge position, squeeze and release.',
      equipment: ['ring'],
      duration: 2,
      targetAreas: ['legs', 'core'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Keep hips lower in bridge',
        knee: 'Place ring higher between thighs if knees are sensitive',
        shoulder: 'No specific modification needed',
        pregnancy: 'Adjust bridge height for comfort',
        balance: 'No specific modification needed'
      },
      image: '🦵'
    },
    {
      id: 24,
      name: 'Arm Circles',
      description: 'Hold light weights, extend arms to sides and make small, controlled circles.',
      equipment: ['weights'],
      duration: 2,
      targetAreas: ['arms', 'shoulders'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'Use lighter weights or no weights',
        back: 'No specific modification needed',
        knee: 'No specific modification needed',
        shoulder: 'Smaller circles and lighter weights',
        pregnancy: 'Use lighter weights',
        balance: 'Sit or stand near wall for support'
      },
      image: '⚪'
    },
    {
      id: 25,
      name: 'Weighted Hundred',
      description: 'Perform the Hundred exercise while holding light weights for added challenge.',
      equipment: ['weights'],
      duration: 2,
      targetAreas: ['core', 'arms'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Use lighter weights or skip weights',
        back: 'Keep head down and legs higher',
        knee: 'No specific modification needed',
        shoulder: 'Use lighter weights or skip weights',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '💯'
    },
    {
      id: 26,
      name: 'Foam Roller Spine Stretch',
      description: 'Sit on mat with foam roller behind back, roll down and up for spinal mobility.',
      equipment: ['foam_roller'],
      duration: 3,
      targetAreas: ['back', 'flexibility'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Smaller range of motion and gentler pressure',
        knee: 'No specific modification needed',
        shoulder: 'No specific modification needed',
        pregnancy: 'Adjust position for comfort or skip',
        balance: 'Place roller against wall'
      },
      image: '📏'
    },
    {
      id: 27,
      name: 'Foam Roller Balance',
      description: 'Sit on foam roller, find balance point, and perform various leg movements.',
      equipment: ['foam_roller'],
      duration: 3,
      targetAreas: ['core', 'balance'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Skip if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'No specific modification needed',
        pregnancy: 'Not recommended',
        balance: 'Start near a wall or chair for support'
      },
      image: '⚖️'
    },
    {
      id: 28,
      name: 'Scissors',
      description: 'Lie on back with legs extended to ceiling, alternate scissor movements with straight legs.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'legs', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Support head with towel if neck/shoulder tension occurs',
        back: 'Bend knees slightly',
        knee: 'Bend knees slightly if hamstrings are tight',
        shoulder: 'Keep head down if neck/shoulder tension occurs',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '✂️'
    },
    {
      id: 29,
      name: 'Bicycle',
      description: 'Lie on back in crunch position, alternate bringing opposite elbow to opposite knee.',
      equipment: ['none'],
      duration: 2,
      targetAreas: ['core', 'legs'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'Support head with towel if neck/shoulder tension occurs',
        back: 'Smaller range of motion',
        knee: 'Gentle movements if knees are sensitive',
        shoulder: 'Support head with towel if neck/shoulder tension occurs',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '🚲'
    },
    {
      id: 30,
      name: 'Plank Variations',
      description: 'Hold plank position and perform various modifications like leg lifts or shoulder taps.',
      equipment: ['none'],
      duration: 3,
      targetAreas: ['core', 'arms', 'fullbody'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Perform from forearms instead of hands',
        back: 'From knees instead of full plank',
        knee: 'From knees instead of full plank',
        shoulder: 'Perform from forearms if shoulders are sensitive',
        pregnancy: 'Not recommended after second trimester',
        balance: 'Start with wall plank at an incline'
      },
      image: '📏'
    },
    {
      id: 31,
      name: 'Chair Push-ups',
      description: 'Stand facing chair with hands on pedal. Lower pedal down and press back up using arm and core strength.',
      equipment: ['chair'],
      duration: 3,
      targetAreas: ['arms', 'core', 'back'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Adjust hand position or use handles if available',
        back: 'Smaller range of motion',
        knee: 'No specific modification needed',
        shoulder: 'Smaller range of motion if shoulders are sensitive',
        pregnancy: 'Not recommended after second trimester',
        balance: 'Stand closer to chair for more stability'
      },
      image: '🪑'
    },
    {
      id: 32,
      name: 'Pike on Chair',
      description: 'Sit on chair edge, hands on pedal. Press pedal down while extending legs to pike position.',
      equipment: ['chair'],
      duration: 3,
      targetAreas: ['core', 'legs', 'arms'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Use handles if available',
        back: 'Smaller range of motion or skip',
        knee: 'Bend knees slightly if hamstrings are tight',
        shoulder: 'Use higher spring setting for more support',
        pregnancy: 'Not recommended',
        balance: 'Use higher spring setting for more stability'
      },
      image: '⛰️'
    },
    {
      id: 33,
      name: 'Chair Mermaid',
      description: 'Sit side-saddle on chair, one hand on pedal. Press pedal down while performing side stretch.',
      equipment: ['chair'],
      duration: 2,
      targetAreas: ['core', 'back', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Adjust hand position or use handle',
        back: 'Smaller range of motion',
        knee: 'No specific modification needed',
        shoulder: 'Smaller range of motion and avoid if painful',
        pregnancy: 'Adjust position for comfort',
        balance: 'Use higher spring setting for stability'
      },
      image: '🧜‍♀️'
    },
    {
      id: 34,
      name: 'Chair Mountain Climber',
      description: 'Start in plank position with feet on chair. Alternate bringing knees toward chest.',
      equipment: ['chair'],
      duration: 3,
      targetAreas: ['core', 'legs', 'fullbody'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Perform on forearms instead of hands',
        back: 'Slower pace or skip',
        knee: 'Slower pace if knees are sensitive',
        shoulder: 'Skip if shoulders are painful',
        pregnancy: 'Not recommended',
        balance: 'Start with stationary plank before adding movement'
      },
      image: '⛰️'
    },
    {
      id: 35,
      name: 'Standing Leg Pumps',
      description: 'Stand facing chair, one foot on pedal. Pump pedal down and up with controlled leg movements.',
      equipment: ['chair'],
      duration: 3,
      targetAreas: ['legs', 'glutes', 'core'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Stand taller and maintain neutral spine',
        knee: 'Smaller range of motion if knees are sensitive',
        shoulder: 'No specific modification needed',
        pregnancy: 'Hold stable support for balance',
        balance: 'Hold onto a stable support'
      },
      image: '🦵'
    },
    {
      id: 36,
      name: 'Tower Roll Back',
      description: 'Sit facing tower, holding roll-down bar. Roll back maintaining C-curve spine, then return to seated.',
      equipment: ['tower'],
      duration: 3,
      targetAreas: ['core', 'back', 'arms'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'Adjust grip on bar',
        back: 'Smaller range of motion or skip if acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Wider grip on bar',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '🏗️'
    },
    {
      id: 37,
      name: 'Tower Leg Springs',
      description: 'Lie on back with feet in tower straps. Perform controlled leg circles and scissors.',
      equipment: ['tower'],
      duration: 4,
      targetAreas: ['legs', 'core', 'flexibility'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Keep range of motion smaller',
        knee: 'Adjust strap position if knees are sensitive',
        shoulder: 'No specific modification needed',
        pregnancy: 'Not recommended after first trimester',
        balance: 'No specific modification needed'
      },
      image: '🦵'
    },
    {
      id: 38,
      name: 'Hanging Pull-ups',
      description: 'Hold tower roll-down bar overhead. Perform pull-ups with body in diagonal position.',
      equipment: ['tower'],
      duration: 3,
      targetAreas: ['arms', 'back', 'core'],
      difficulty: 'advanced',
      modifications: {
        wrist: 'Adjust grip on bar',
        back: 'Skip if you have acute back pain',
        knee: 'No specific modification needed',
        shoulder: 'Skip if shoulders are painful',
        pregnancy: 'Not recommended',
        balance: 'Use higher spring setting for more support'
      },
      image: '💪'
    },
    {
      id: 39,
      name: 'Tower Side Splits',
      description: 'Lie on side with top leg in tower strap. Lift and lower leg with controlled movements.',
      equipment: ['tower'],
      duration: 3,
      targetAreas: ['legs', 'glutes', 'core'],
      difficulty: 'intermediate',
      modifications: {
        wrist: 'No specific modification needed',
        back: 'Support lower back with small towel roll if needed',
        knee: 'Skip if knee pain is present',
        shoulder: 'Support head with pillow if needed',
        pregnancy: 'Adjust for comfort or skip after second trimester',
        balance: 'No specific modification needed'
      },
      image: '↔️'
    },
    {
      id: 40,
      name: 'Tower Breathing',
      description: 'Sit with back against tower, arms in straps. Focus on expanding ribcage with deep breaths while pressing arms out.',
      equipment: ['tower'],
      duration: 2,
      targetAreas: ['core', 'arms', 'back'],
      difficulty: 'beginner',
      modifications: {
        wrist: 'Adjust strap position on arms',
        back: 'Use cushion for support if needed',
        knee: 'No specific modification needed',
        shoulder: 'Smaller range of motion',
        pregnancy: 'Adjust position for comfort',
        balance: 'No specific modification needed'
      },
      image: '🫁'
    },
  ];

  export default exerciseDatabase;